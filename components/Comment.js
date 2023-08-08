/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import IconInfo from '@/components/IconInfo'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import styles from '@/styles/noticiaById.module.css'
import { useState } from 'react'
import AuthContext from '@/context/AuthContext'
import useAxios from '@/services/useAxios'
const Comment = ({ comment, id, commentUdpated, handleDelete }) => {
    const [isEditing, setIsEditing] = useState([]);
    const [commentEditData, setCommentEditData] = useState(comment.description);
    const [commentEditError, setCommentEditError] = useState();
    const [commentEditOk, setCommentEditOk] = useState();
    const { user } = useContext(AuthContext);
    const api = useAxios();
    const URL = "https://backcef.up.railway.app"


    const handleInputEditComment = (event) => {
        setCommentEditData(event.target.value);
        setCommentEditError('');
    }

    const handleEdit = (id) => {
        const updateIsEditing = [...isEditing];
        updateIsEditing[id] = true;
        setIsEditing(updateIsEditing);
    }
    const handleCancel = (id) => {
        const updateIsEditing = [...isEditing];
        updateIsEditing[id] = false;
        setIsEditing(updateIsEditing);
        setCommentEditData(comment.description);
        setCommentEditError('');
    }

    const submitUpdateComment = async () => {
        if(!commentEditData){
            setCommentEditError("Campo obrigatório!")
            return;
        }

        const data = {
            "description": commentEditData
        }

        try{
            const response = await api.patch(`${URL}/api/update_comment/${comment.id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            commentUdpated(response.data.message); 
            const updateIsEditing = [...isEditing];
            updateIsEditing[id] = false;
            setIsEditing(updateIsEditing);
        }catch(error){
            if(error.response){
                setCommentEditError(error.response.data?.error);
            }
        }
    }

    return (
        <div key={comment.id} id={`comment-${id}`} className={styles.grid_comments}>
            <div className={styles.flex}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/assets/images/profile_photo.webp" width={40} height={40} alt="" />
                    <div>
                        <p style={{ fontWeight: 'bold' }}>{comment.user.nome} {comment.user.sobrenome}</p>
                        <p>{comment.published_at === comment.updated_at ?
                            `Publicado • ${new Date(comment.published_at).toLocaleString()}` :
                            `Atualizado • ${new Date(comment.updated_at).toLocaleString()}`}</p>
                    </div>
                </div>
                {!isEditing[id] ? user?.user_id === comment?.user.id ? <div style={{ display: 'flex', gap: '5px' }}>
                    <FiEdit className={styles.icon} onClick={() => handleEdit(id)} />
                    <AiOutlineDelete className={styles.icon} onClick={()=>handleDelete(comment.id)}/>
                </div>
                    : ''
                    : ''
                }
            </div>
            {!isEditing[id] ? <div style={{ fontSize: '14px', textAlign: 'justify', color: '#333' }}>{comment.description}</div> :
                <>
                    <textarea value={commentEditData ? commentEditData : ''} 
                    style={commentEditError ? { border: '1px solid red' } : {border: '1px solid black'}}
                    type="text"  name="comentario" onChange={handleInputEditComment} placeholder='Digite um comentário' />
                    {commentEditError ? <p style={{fontSize: 12, color:'red'}}>{commentEditError}</p> : ''}
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }} className={styles.edit_comment}>
                        <button href="" onClick={() => handleCancel(id)} >Cancelar</button>
                        <button href=""  onClick={submitUpdateComment} disabled={commentEditData ? false : true}>Atualizar</button>
                    </div>
                </>
            }

        </div>
    )
}

export default Comment