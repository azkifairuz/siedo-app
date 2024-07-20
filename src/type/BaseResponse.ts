import type { Pagination } from "./Pagination";

export type BaseResponse<T> = {
    data: T;
    paginationData?: Pagination;
    statusCode: number;
    message: string;
};