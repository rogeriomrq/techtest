import {api} from "@/services/api.ts";

/**
 * Formato padrão da resposta do backend
 */
export interface IResponseBack<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ISaveProps {
  url: string;
  dados: any;
  id?: number | string;
}

/**
 * Get
 * @param url
 * @param signal para cancelar a requisição
 * @param apenasDados para pegar apenas o data da requisição, ignorando o status e a mensagem (para ser usado com o react query)
 */
export async function recuperar(
  url: string,
  signal?: AbortSignal,
  apenasDados = false
) {
  try {
    const { data } = await api.get(url, { signal });
    return apenasDados ? data.data ?? null : data;
  } catch (error) {
    throw error;
  }
}

/**
 * Post para cadastro ou edição
 * @param url
 * @param dados
 * @param id
 */
export async function salvar({ url, dados, id }: ISaveProps) {
  if (id) {
    return await api.put(`${url}/${id}`, { ...dados });
  }

  return await api.post(url, { ...dados });
}

/**
 * Deletar
 * @param url
 */
export async function deletar(url: string) {
  return api.delete(url);
}

/**
 * Get pegando os dados da url
 * @param url
 * @param dados
 * @param signal
 * @param apenasDados
 */
export async function pesquisar(
  url: string,
  dados: any,
  signal?: AbortSignal,
  apenasDados = false
) {
  try {
    const params = new URLSearchParams(dados).toString();
    return recuperar(url + '?' + params, signal, apenasDados);
  } catch (error) {
    throw error;
  }
}

/**
 * Requisição GET do axios que será refeita 3 vezes em caso de erro
 * @param config
 * @param retryCount
 */
export async function getRetry(
  config: { url: string; signal?: AbortSignal },
  retryCount = 3
): Promise<IResponseBack<any>> {
  try {
    return await api.get(config.url, { signal: config.signal });
  } catch (error: any) {
    // Verificar se é uma situação em que deve haver retry
    if (retryCount > 0 && error.response) {
      return getRetry(config, retryCount - 1);
    } else {
      // Se não for uma situação de retry, rejeitar a promise com o erro original
      throw error;
    }
  }
}
