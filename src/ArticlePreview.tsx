import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import {Link, useParams} from 'react-router-dom';
import {requestArticlesByCategory} from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ArticlesPreviewProp {
    categoryButtonsRefs: Array<HTMLElement>
}

interface ArticlesPreviewParams {
    categoryName: string
}

function ArticlesPreview(props: ArticlesPreviewProp) {
    const [shownArticles, setArticles] = useState<Array<ArticlePreviewProp>>([]);
    const {categoryName} = useParams<ArticlesPreviewParams>();

    useEffect(() => {
        console.log(1);
        props.categoryButtonsRefs.forEach(element => element.classList.replace('bg-success', 'bg-primary'));
        let clickedElement = props.categoryButtonsRefs.find(element => element.textContent === categoryName);
        if (clickedElement) {
            clickedElement.classList.replace('bg-primary', 'bg-success');
        }
        const articles = requestArticlesByCategory(categoryName);
        setArticles(articles);
    }, [categoryName, props]);

    return (
        <div key={categoryName} className='border border-rounded'>
            {
                shownArticles.map(
                    article => {
                        return (
                            <ArticlePreview key={article.id} id={article.id} title={article.title} time={article.time}/>
                        );
                    }
                )
            }
        </div>
    );
}

interface ArticlePreviewProp {
    id: number,
    title: string,
    time: string
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

export default ArticlesPreview;
