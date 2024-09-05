// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchDeviceById } from '../http/deviceAPI';
// import { addToBasket, checkDeviceInBasket } from '../http/basketAPI';
// import { getUserIdFromToken } from '../utils/auth'; 
// import { addComment, editComment, deleteComment, getCommentsByDeviceId } from '../http/commentAPI'; // Импорт функций для работы с комментариями

// const DevicePage = () => {
//   const { id } = useParams(); // ID устройства из URL
//   const [device, setDevice] = useState(null);
//   const [isInBasket, setIsInBasket] = useState(false);
//   const [comments, setComments] = useState([]); // Состояние для комментариев
//   const [newComment, setNewComment] = useState(''); // Состояние для нового комментария
//   const [editCommentId, setEditCommentId] = useState(null); // ID комментария, который редактируется
//   const [editCommentText, setEditCommentText] = useState(''); // Текст редактируемого комментария

//   useEffect(() => {
//     const loadDevice = async () => {
//       try {
//         const deviceData = await fetchDeviceById(id);
//         setDevice(deviceData);
//       } catch (error) {
//         console.error('Ошибка при загрузке данных устройства:', error);
//       }
//     };

//     loadDevice();
//   }, [id]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const commentsData = await getCommentsByDeviceId(id); // Получение комментариев для устройства
//         setComments(commentsData);
//       } catch (error) {
//         console.error('Ошибка при загрузке комментариев:', error);
//       }
//     };

//     fetchComments();
//   }, [id]);

//   useEffect(() => {
//     const checkIfInBasket = async () => {
//       const userId = getUserIdFromToken();
//       if (userId) {
//         try {
//           const response = await checkDeviceInBasket(userId, id);
//           setIsInBasket(response.exists);
//         } catch (error) {
//           console.error('Ошибка при проверке устройства в корзине:', error);
//         }
//       }
//     };

//     checkIfInBasket();
//   }, [id]);

//   const handleAddToBasket = async () => {
//     const userId = getUserIdFromToken();
//     if (userId) {
//       try {
//         await addToBasket(userId, id);
//         setIsInBasket(true);
//         alert('Товар добавлен в корзину!');
//       } catch (error) {
//         console.error('Ошибка при добавлении в корзину:', error);
//       }
//     }
//   };

//   const handleAddComment = async () => {
//     const userId = getUserIdFromToken();
//     if (userId && newComment.trim()) {
//       try {
//         await addComment(userId, id, newComment); // Добавление комментария
//         setNewComment(''); // Очистка поля
//         const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//         setComments(updatedComments);
//       } catch (error) {
//         console.error('Ошибка при добавлении комментария:', error);
//       }
//     }
//   };

//   const handleEditComment = async () => {
//     if (editCommentId && editCommentText.trim()) {
//       try {
//         await editComment(editCommentId, editCommentText); // Редактирование комментария
//         setEditCommentId(null); // Сброс редактируемого комментария
//         setEditCommentText(''); // Очистка поля
//         const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//         setComments(updatedComments);
//       } catch (error) {
//         console.error('Ошибка при редактировании комментария:', error);
//       }
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(commentId); // Удаление комментария
//       const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//       setComments(updatedComments);
//     } catch (error) {
//       console.error('Ошибка при удалении комментария:', error);
//     }
//   };

//   if (!device) return <p>Загрузка...</p>;

//   return (
//     <div className="device-page">
//       <h1>{device.name}</h1>
//       <img 
//         src={`http://localhost:5000/${device.img}`} 
//         alt={device.name} 
//         style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
//       />
//       <p>{device.description}</p>
//       <p>Цена: ${device.price}</p>
//       {isInBasket ? (
//         <p>Товар уже есть в корзине</p>
//       ) : (
//         <button onClick={handleAddToBasket}>Добавить в корзину</button>
//       )}

//       {/* Отображение комментариев */}
//       <div className="comments-section">
//         <h2>Комментарии</h2>
//         {comments.map((comment) => (
//           <div key={comment.id} className="comment">
//             <p><strong>{comment.user.login}:</strong> {comment.text}</p>
//             {getUserIdFromToken() === comment.userId && ( // Проверяем, что пользователь может редактировать/удалять только свои комментарии
//               <>
//                 <button onClick={() => {
//                   setEditCommentId(comment.id);
//                   setEditCommentText(comment.text);
//                 }}>Редактировать</button>
//                 <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
//               </>
//             )}
//           </div>
//         ))}
//         {editCommentId && ( // Форма для редактирования комментария
//           <div className="edit-comment-section">
//             <textarea 
//               value={editCommentText} 
//               onChange={(e) => setEditCommentText(e.target.value)}
//             />
//             <button onClick={handleEditComment}>Сохранить изменения</button>
//           </div>
//         )}
//       </div>

//       {/* Форма для добавления нового комментария */}
//       <div className="add-comment-section">
//         <textarea 
//           value={newComment} 
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Напишите ваш комментарий..."
//         />
//         <button onClick={handleAddComment}>Добавить комментарий</button>
//       </div>
//     </div>
//   );
// };

// export default DevicePage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeviceById, updateDevice, deleteDevice } from '../http/deviceAPI';
import { addToBasket, checkDeviceInBasket } from '../http/basketAPI';
import { getUserIdFromToken } from '../utils/auth';
import { addComment, editComment, deleteComment, getCommentsByDeviceId } from '../http/commentAPI';

const DevicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [isInBasket, setIsInBasket] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Состояние для управления режимом редактирования
  const [editedDevice, setEditedDevice] = useState({}); // Состояние для хранения редактируемых данных

  const userId = getUserIdFromToken();

  useEffect(() => {
    const loadDevice = async () => {
      try {
        const deviceData = await fetchDeviceById(id);
        setDevice(deviceData);
        setEditedDevice(deviceData); // Устанавливаем начальные значения для редактирования
        if (deviceData && deviceData.userId === userId) {
          setIsSupplier(true);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных устройства:', error);
      }
    };

    loadDevice();
  }, [id, userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByDeviceId(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const checkIfInBasket = async () => {
      if (userId) {
        try {
          const response = await checkDeviceInBasket(userId, id);
          setIsInBasket(response.exists);
        } catch (error) {
          console.error('Ошибка при проверке устройства в корзине:', error);
        }
      }
    };

    checkIfInBasket();
  }, [id, userId]);

  const handleAddToBasket = async () => {
    if (userId) {
      try {
        await addToBasket(userId, id);
        setIsInBasket(true);
        alert('Товар добавлен в корзину!');
      } catch (error) {
        console.error('Ошибка при добавлении устройства в корзину:', error);
      }
    } else {
      alert('Пожалуйста, войдите в систему для добавления в корзину');
    }
  };

  const handleDeleteDevice = async () => {
    try {
      await deleteDevice(id);
      alert('Устройство удалено успешно!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении устройства:', error);
    }
  };

  const handleEditDevice = async () => {
    if (isEditing) {
      try {
        await updateDevice(id, editedDevice);
        alert('Устройство обновлено успешно!');
        setDevice(editedDevice); // Обновляем состояние устройства новыми данными
        setIsEditing(false); // Выключаем режим редактирования
      } catch (error) {
        console.error('Ошибка при обновлении устройства:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDevice((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment(id, newComment);
        setNewComment('');
        const updatedComments = await getCommentsByDeviceId(id);
        setComments(updatedComments);
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    }
  };

  const handleEditComment = async (commentId) => {
    if (editCommentText.trim()) {
      try {
        await editComment(commentId, editCommentText);
        setEditCommentId(null);
        setEditCommentText('');
        const updatedComments = await getCommentsByDeviceId(id);
        setComments(updatedComments);
      } catch (error) {
        console.error('Ошибка при редактировании комментария:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = await getCommentsByDeviceId(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  return (
    <div>
      {device ? (
        <>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedDevice.name || ''}
                onChange={handleChange}
                placeholder="Название устройства"
              />
              <input
                type="text"
                name="price"
                value={editedDevice.price || ''}
                onChange={handleChange}
                placeholder="Цена устройства"
              />
              <input
                type="text"
                name="description"
                value={editedDevice.description || ''}
                onChange={handleChange}
                placeholder="Описание устройства"
              />
              <input
                type="text"
                name="phone"
                value={editedDevice.phone || ''}
                onChange={handleChange}
                placeholder="Контактный телефон"
              />
            </>
          ) : (
            <>
              <img src={'http://localhost:5000/' + device.img} alt={device.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }}  />
              <h1>{device.name}</h1>
              <p>Цена: {device.price}</p>
              <p>Описание: {device.description}</p>
              <p>Телефон: {device.phone}</p>
            </>
          )}
          {isSupplier && (
            <div>
              <button onClick={handleEditDevice}>
                {isEditing ? 'Сохранить изменения' : 'Редактировать'}
              </button>
              <button onClick={handleDeleteDevice}>Удалить</button>
            </div>
          )}
          {!isInBasket && (
            <button onClick={handleAddToBasket}>Добавить в корзину</button>
          )}
          <div>
            <h2>Комментарии</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Добавьте комментарий"
            />
            <button onClick={handleAddComment}>Добавить комментарий</button>
            {comments.map((comment) => (
              <div key={comment.id}>
                {editCommentId === comment.id ? (
                  <>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                    />
                    <button onClick={() => handleEditComment(comment.id)}>Сохранить</button>
                    <button onClick={() => setEditCommentId(null)}>Отменить</button>
                  </>
                ) : (
                  <>
                    <p>{comment.text}</p>
                    {comment.userId === userId && (
                      <>
                        <button onClick={() => { setEditCommentId(comment.id); setEditCommentText(comment.text); }}>
                          Редактировать
                        </button>
                        <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default DevicePage;
