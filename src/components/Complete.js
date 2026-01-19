import React from 'react';
import { useNavigate } from 'react-router-dom';  // Для кнопки "Вернуться"

const Complete = ({ formData, updateFormData }) => {  // formData для отображения данных, если нужно
    const navigate = useNavigate();

    const handleBackToHome = () => {
        updateFormData({});
        localStorage.removeItem('formData')
        navigate('/');  // Или на главную страницу
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Форма успешно отправлена!</h1>
            <p>Спасибо за заполнение. Ваши данные сохранены.</p>
            {/* Опционально: отобразить summary данных */}
            <button onClick={handleBackToHome}>
                Вернуться на главную
            </button>
        </div>
    );
};

export default Complete;