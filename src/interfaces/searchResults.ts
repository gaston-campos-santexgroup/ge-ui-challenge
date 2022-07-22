import { Book } from './index';

export interface SearchResult {
    item: Book;
    refIndex: number;
    score: number;
}