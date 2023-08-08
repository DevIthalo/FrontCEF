/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'
import useAxios from '@/services/useAxios'
import styles from '@/styles/userComments.module.css'
import AuthContext from '@/context/AuthContext'
import { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ThreeDotMenu from './ThreeDotMenu'
const CommentUser = ({ comment, isToggle, index, sendMessageOk, sendMessageError, openModalDelete, isAdmin }) => {

    const [editing, setEditing] = useState([]);
    const [messageError, setMessageError] = useState();
    const [commentData, setCommentData] = useState(comment.description);
    const [options, setOptions] = useState();
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const api = useAxios();
    const { user } = useContext(AuthContext);
    const URL = "https://backcef.up.railway.app"

    const handleOptions = (id) => {
        setOptions(id);
    }
    const handleOptionsLeave = () => {
        setOptions();
    }

    const handleChangeComment = (event) => {
        setCommentData(event.target.value);
        setMessageError('');
    }

    const handleEditing = (id) => {
        const updateEditing = [...editing];
        updateEditing[id] = true;
        setEditing(updateEditing);
        setCommentData(comment.description);
        setMessageError('');
        setIsVisible(false);
    }

    const handleEditingCancel = (id) => {
        const updateEditing = [...editing];
        updateEditing[id] = false;
        setEditing(updateEditing);
        setCommentData(comment.description);
        setOptions();
        setMessageError('');

    }

    const handleVisibleMenu = () => {
        setIsVisible(!isVisible);
    }

    const editComment = async (id, index) => {
        if (commentData === '') {
            setMessageError("Campo obrigatório")
            return;
        }
        const data = {
            "description": commentData
        }
        try {
            const response = await api.patch(`${URL}/api/update_comment/${id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            sendMessageOk(response.data.message);
            const updateEditing = [...editing];
            updateEditing[index] = false;
            setEditing(updateEditing);
            setCommentData('');
            setOptions();
            setCommentData(comment.description);

            return () => clearTimeout(timeout);
        } catch (error) {
            sendMessageError(error.response?.data?.error);
        }
    }

    useEffect(() => {
        function handleResize() {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div key={comment.id} onMouseEnter={() => handleOptions(comment.id)}
            onMouseLeave={handleOptionsLeave} className={styles.comment_card}>
            <div className={styles.comment_card_title}>
                <img src="/assets/images/profile_photo.webp" width={70} height={70} alt="" />
                <div>
                    <p>
                        <strong>{user?.user_id === comment.user.id ? 'Você' : `${comment.user.nome} ${comment.user.sobrenome}`}</strong> comentou em <strong className={styles.comment_link_post}>
                            &quot;
                            <Link href={`/noticias/${comment.post.title.replace(/ /g, '-').replace('?', '')}/${comment.post.id}`}>
                                {comment.post.title}
                            </Link>
                            &quot;
                        </strong>
                    </p>
                    <div style={{ margin: 10 }}></div>
                    {!editing[index] ? <p>{comment.description}</p>
                        : <div>
                            <textarea value={commentData ? commentData : ''} onChange={handleChangeComment} className={styles.textarea} rows={3} cols={60} placeholder='Editar Comentário'></textarea>
                            {messageError ? <p style={{ fontSize: 12, color: 'red' }}>{messageError}</p> : ''}
                            <div className={styles.comment_options}>
                                <button onClick={() => handleEditingCancel(index)}>Cancelar</button>
                                <button onClick={() => editComment(comment.id, index)} disabled={commentData ? false : true}>Editar</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {!editing[index] ? screenSize.width > 1040 ?
                <>
                    <div className={styles.comment_data} style={options === comment.id ? { display: 'none' } : { display: 'block' }}>
                        <p>{comment.published_at === comment.updated_at ? `Publicado • ${new Date(comment.published_at).toLocaleString()}` : `Atualizado • ${new Date(comment.updated_at).toLocaleString()}`}</p>
                    </div>
                    <div style={options === comment.id ? { display: 'flex', color: '#444' } : { display: 'none' }} className={styles.comment_data}>
                        {!isAdmin ? <FaRegEdit className={styles.icon} onClick={() => handleEditing(index)} /> : ''}
                        <AiOutlineDelete className={styles.icon} onClick={() => openModalDelete(comment.id)} />
                    </div>
                </>
                :
                <>
                    <div style={{ width: 10, height: 10 }}>
                        <BsThreeDotsVertical width={5} height={5} style={{ fontSize: 20 }} onClick={handleVisibleMenu} />
                    </div>
                    <ThreeDotMenu isVisible={isVisible} isAdmin={isAdmin} onEdit={() => handleEditing(index)} onDelete={()=> {openModalDelete(comment.id); handleVisibleMenu()}}/>
                </>
                : ''
            }
        </div>
    )
}

export default CommentUser