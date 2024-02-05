import {User} from 'entities/user';
import {ArticleBlockType, ArticleType} from "entities/Articles/model/consts/consts";

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    paragraphs: string[];
    title?: string
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock;

export interface Article {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    createdAt: string,
    user: User,
    type: ArticleType[],
    blocks: ArticleBlock[]
}
