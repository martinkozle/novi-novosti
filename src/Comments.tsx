import React, {useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import {requestCommentsByArticleID, saveComment} from './API';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CommentsProp {
    articleID: number
}

interface CommentInterface {
    id: number,
    text: string,
    time: string,
    author: string
}

interface CommentProp {
    id: number,
    text: string,
    time: string,
    author: string,
    animate?: boolean
}

interface CommentBoxProp {
    articleID: number,
    updateCommentsFunc: () => void
}

function Comments(props: CommentsProp) {
    const [comments, setComments] = useState<CommentProp[]>([]);
    const [commentedAnimation, setCommentedAnimation] = useState<boolean>(false);

    function updateComments(articleID: number, animate: boolean) {
        const updatedComments = requestCommentsByArticleID(articleID);
        setComments(updatedComments);
        setCommentedAnimation(animate);
    }

    useEffect(() => {
        updateComments(props.articleID, false);
    }, [props.articleID]);

    return (
        <div className='mt-2 border'>
            <CommentBox articleID={props.articleID} updateCommentsFunc={() => updateComments(props.articleID, true)}/>
            <div>
                {
                    comments.map((comment, index) => {
                        return <Comment {...comment} key={comment.id} animate={index === 0 && commentedAnimation}/>
                    })
                }
            </div>
        </div>
    );
}

function Comment(props: CommentProp) {
    return (
        <Collapse appear={props.animate} in={true} timeout={500}>
            <div className='border border-rounded bg-light mx-2 my-4 p-2'>
                <div>
                    <i className="bi bi-person-circle fs-2 "></i>
                    <span className='fs-5'> {props.author}</span>
                </div>

                <p>
                    {props.text}
                </p>
                <small className='text-muted me-auto'>Објавено на {props.time}</small>
            </div>
        </Collapse>
    );
}

function CommentBox(props: CommentBoxProp) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function clickButton(e: React.MouseEvent) {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (textAreaRef.current && textAreaRef.current.value !== '') {
            const comment: CommentInterface = {
                id: Date.now(),
                text: textAreaRef.current.value,
                time: `${dd}.${mm}.${yyyy}`,
                author: 'Мартин'
            }
            textAreaRef.current.value = '';
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
