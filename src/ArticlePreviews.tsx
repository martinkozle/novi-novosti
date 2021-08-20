import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {requestArticlePreviewByID, requestArticlePreviewsByCategory, requestSavedArticles} from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


interface ArticlePreviewsProp {
    title?: string,
    shownArticles: ArticlePreviewProp[]
}

interface ArticlePreviewProp {
    id: number,
    title: string,
    time: string
}

interface CategoryArticlePreviewsParams {
    categoryName: string
}

function CategoryArticlePreviews() {
    const [shownArticles, setArticles] = useState<ArticlePreviewProp[]>([]);
    const {categoryName} = useParams<CategoryArticlePreviewsParams>();

    useEffect(() => {
        const articles = requestArticlePreviewsByCategory(categoryName);
        setArticles(articles);

    }, [categoryName]);

    return <ArticlePreviews title={categoryName} shownArticles={shownArticles}/>
}

function SavedArticlePreviews() {
    const articleIDs = requestSavedArticles();
    const articlePreviews: ArticlePreviewProp[] = articleIDs.map(requestArticlePreviewByID).filter(article => article !== undefined) as ArticlePreviewProp[];
    return (
        <ArticlePreviews title='Зачувани објави' shownArticles={articlePreviews}/>
    );
}

function ArticlePreviews(props: ArticlePreviewsProp) {
    const [shownArticles, setArticles] = useState<ArticlePreviewProp[]>([]);

    useEffect(() => {
        setArticles(props.shownArticles);
    }, [props.shownArticles]);

    let articlePreviewElements;
    if (shownArticles.length > 0) {
        articlePreviewElements = shownArticles.map(
            article => {
                return (
                    <ArticlePreview key={article.id} id={article.id} title={article.title}
                                    time={article.time}/>
                );
            }
        )
    } else {
        articlePreviewElements = <h2 className='mx-2 my-4'>Празно!</h2>
    }

    return (
        <Container className='mt-2'>
            <h2>
                <i className="bi bi-square-fill fs-5 text-success me-2"></i>
                {props.title}
            </h2>
            <div className='border border-rounded mt-3'>
                {articlePreviewElements}
            </div>
        </Container>
    );
}


function ArticlePreview(props: ArticlePreviewProp) {
    return (
        <div className='border border-rounded bg-light mx-2 my-4 p-2'>
            <Link to={`/article/${props.id}`} className='text-decoration-none text-black'>
                <h2 className='header'>
                    {props.title}
                </h2>
            </Link>
            <Nav>
                <small className='text-muted me-auto'>Објавено на {props.time}</small>
                <Link to={`/article/${props.id}`}>
                    <Button>Прочитај повеќе...</Button>
                </Link>
            </Nav>
        </div>
    );
}

export {ArticlePreviews, CategoryArticlePreviews, SavedArticlePreviews};
