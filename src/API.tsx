import articles from './data/articles.json';

export function requestArticleByID(articleID: number) {
    // return mock article
    return articles.articles.find(article => article.id === articleID);
}

export function requestArticlesByCategory(category: string) {
    // return mock article previews array
    return articles.articles.filter(article => article.categories.includes(category));
}
