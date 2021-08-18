// this file contains mock requests to local json files and browser local storage
import articles from './data/articles.json';


export function requestArticlePreviewByID(articleID: number) {
    // return mock article preview
    const article = requestArticleByID(articleID);
    if (article) {
        const {text, categories, ...articlePreview} = article;
        return articlePreview;
    }
    return article;
}

export function requestArticleByID(articleID: number) {
    // return mock article
    return articles.articles.find(article => article.id === articleID);
}

export function requestArticlePreviewsByCategory(category: string) {
    // return mock article previews array
    return articles.articles.filter(article => article.categories.includes(category)).map(article => {
        const {text, categories, ...articlePreview} = article; // front-end will not get text and categories elements from API
        return articlePreview;
    });
}

export function requestSavedArticles(): number[] {
    // return saved articles from local storage
    const savedArticlesString = localStorage.getItem('savedArticles');
    if (savedArticlesString) {
        return JSON.parse(savedArticlesString)['articles'];
    }
    return [];
}

export function saveArticle(articleID: number) {
    // save article to local storage
    const savedArticles = requestSavedArticles();
    const newSavedArticles = [...savedArticles, articleID];
    localStorage.setItem('savedArticles', JSON.stringify({articles: newSavedArticles}));
}

export function unsaveArticle(articleID: number) {
    // remove article from local storage
    const savedArticles = requestSavedArticles();
    const newSavedArticles = savedArticles.filter(item => item !== articleID);
    localStorage.setItem('savedArticles', JSON.stringify({articles: newSavedArticles}));
}

export function isArticleSaved(articleID: number) {
    // check if article is saved in local storage
    return requestSavedArticles().includes(articleID);
}
