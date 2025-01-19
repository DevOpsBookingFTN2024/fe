import axiosClient, { headers } from "./axios";

export type PredefinedRequest = Omit<RequestInit, "method" | "body">;

export function get(url: string | URL) {
  return axiosClient.get(url.toString()).then((x) => x.data);
}

export function post(url: string | URL, body: string) {
  return axiosClient.post(url.toString(), body, {
    headers: headers(),
  });
}

export function put(url: string | URL, body: string) {
  return axiosClient.put(url.toString(), body, {
    headers: headers(),
  });
}

export function del(baseUrl: string | URL, id?: number) {
  return axiosClient.delete(new URL(id?.toString() ?? "", baseUrl).toString());
}

export function restore(baseUrl: string | URL, id: number) {
  return axiosClient.put(new URL("restore/" + id, baseUrl).toString());
}
export function appendFormDataFromObject(
  formData: FormData,
  obj: any
): FormData {
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, String(value));
    }
  }
  return formData;
}

export type InputFormData<T> = {
  files?: File[];
  body?: T;
};

export function postMultipart(
  baseUrl: string | URL,
  input: InputFormData<unknown>
) {
  let formData = new FormData();

  if (input.files) {
    input.files.forEach((image) => formData.append("files", image));
  }

  if (input.body) formData = appendFormDataFromObject(formData, input.body);

  return axiosClient.post(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

export function putMultipart(
  baseUrl: string | URL,
  input: InputFormData<unknown>
) {
  let formData = new FormData();

  if (input.files) {
    input.files.forEach((image) => formData.append("files", image));
  }
  formData = appendFormDataFromObject(formData, input.body);
  return axiosClient.put(baseUrl.toString(), formData, {
    headers: headers(undefined, ""),
  });
}

export function addPaginationParams(baseUrl: URL, ...filters: object[]): URL {
  filters.forEach((f) => {
    for (const [k, v] of Object.entries(f)) {
      if (v != null && !(typeof v == "string" && v.trim().length == 0)) {
        baseUrl.searchParams.set(k, v);
      }
    }
  });
  return baseUrl;
}

export function addListFilterParams(baseUrl: URL, ...filters: object[]): URL {
  const modifiedUrl = new URL(baseUrl);
  filters.forEach((f) => {
    if (!f) return;
    for (const [k, v] of Object.entries(f)) {
      if (
        v != null &&
        !(
          (typeof v === "string" && v.trim().length === 0) ||
          (Array.isArray(v) && v.length === 0)
        )
      ) {
        modifiedUrl.searchParams.set(k, v);
      }
    }
  });
  return modifiedUrl;
}
