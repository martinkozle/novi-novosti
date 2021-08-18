import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {requestCommentsByArticleID, saveComment} from './API';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CommentsProp {
    articleID: number
}

interface CommentProp {
    id: number,
    text: string,
    time: string,
    author: string
}

interface CommentBoxProp {
    articleID: number,
    updateCommentsFunc: () => void
}

function Comments(props: CommentsProp) {
    const [comments, setComments] = useState<CommentProp[]>([]);

    useEffect(() => {
        updateComments();
    }, []);

    function updateComments() {
        const updatedComments = requestCommentsByArticleID(props.articleID);
        setComments(updatedComments);
    }

    return (
        <div className='mt-2 border'>
            <CommentBox articleID={props.articleID} updateCommentsFunc={updateComments} />
            <div>
            {
                comments.map(comment => {
                    return <Comment {...comment}/>
                })
            }
            </div>
        </div>
    );
}

function Comment(props: CommentProp) {
    return (
        <div className='border border-rounded bg-light mx-2 my-4 p-2' key={props.id}>
            <div>
                <i className="bi bi-person-circle fs-2 "></i>
                <span className='fs-5'> {props.author}</span>
            </div>

            <p>
                {props.text}
            </p>
            <small className='text-muted me-auto'>Објавено на {props.time}</small>
        </div>
    );
}

function CommentBox(props: CommentBoxProp) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function clickButton(e: React.MouseEvent) {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (textAreaRef.current) {
            const comment: CommentProp = {
                id: Date.now(),
                text: textAreaRef.current.value,
                time: `${dd}.${mm}.${yyyy}`,
                author: 'Мартин'
            }
            console.log(comment);
            saveComment(props.articleID, comment);
            props.updateCommentsFunc();
        }
    }

    return (
        <div className='m-2'>
            <Form.Group className='d-flex flex-row'>
                <Form.Control as='textarea' placeholder='Напиши коментар...' className='me-2' ref={textAreaRef}>
                </Form.Control>
                <Button type='submit' style={{height: 75}} onClick={(e) => clickButton(e)}>
                    <i className="bi bi-arrow-return-left fs-1"></i>
                </Button>
            </Form.Group>
        </div>
    )
}

export default Comments;
