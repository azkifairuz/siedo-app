import type { Pagination } from "./Pagination";

export type BaseResponse<T> = {
    data: T;
    paginationData?: Pagination;
    status_code: number;
    message: string;
};