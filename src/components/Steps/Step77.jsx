import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step77 = ({ formData, updateFormData, onBack, onSubmit }) => {
    const { errors, validateAll, clearError } = useFormValidation();
   
    const [areaName, setAreaName] = useState('');
    const [areaEmail, setAreaEmail] = useState('');
    const [areaPhone, setAreaPhone] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleInName = (e) => {
        const value = e.target.value;
        setAreaName(value);
        updateFormData({ Name: value });
        clearError('inName'); 
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        setAreaEmail(value);
        updateFormData({ Email: value });
        clearError('inEmail');
    };

    const handlePhone = (e) => {
        const value = e.target.value;
        setAreaPhone(value);
        updateFormData({ Телефон: value });
        clearError('inPhone');
    };

    const handleAgreement = (e) => {
        const value = e.target.checked;
        setAgreed(value);
        updateFormData({ Agreement: value });
        clearError('inAgreement');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Объект полей для валидации (на английском для consistency с JSX)
        const fields = {
            inName: areaName,  // В котельной
            inName_rules: { required: true },  
            inEmail: areaEmail,  // На улице
            inEmail_rules: { required: true, email: true },
            inPhone: areaPhone,  // На улице
            inPhone_rules: { required: true, phone: true }, 
            inAgreement: agreed,
            inAgreement_rules: { required: true }, 
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            // Нет alert — ошибки под полями
            return;
        }
        
        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit();  // Отправка формы
        } else {
            console.error('onSubmit не является функцией');  // Дебаг, если что
        }
    };

    return (
        <div>
            <h4>Данные для обратной связи</h4>
            
            <form onSubmit={handleSubmit}>
                <div className='quest'>Ваше имя</div>
                <label>
                    <input
                        type="text"
                        id="expanded"
                        name="expanded"
                        value={areaName}  // Локальное состояние
                        onChange={handleInName}
                        placeholder="ФИО"
                    />
                </label>
                {errors.inName && <p className="error">{errors.inName}</p>}
                
                <div className='quest'>Электронная почта</div>
                <label>
                    <input
                        type="text"
                        id="elongate"
                        name="elongate"
                        value={areaEmail}
                        onChange={handleEmail}
                        placeholder="Email"
                    />
                </label>
                {errors.inEmail && <p className="error">{errors.inEmail}</p>}
                
                <div className='quest'>Телефон</div>
                <label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={areaPhone}
                        onChange={handlePhone}
                        placeholder="Номер телефона"
                    />
                </label>
                {errors.inPhone && <p className="error">{errors.inPhone}</p>}

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={handleAgreement}
                    />
                    <span style={{marginLeft: "10px"}}>Нажимая кнопку «Отправить», Вы соглашаетесь на обработку персональных данных и с политикой обработки персональных данных, а также - на получение почтовых рассылок рекламного и/или информационного характера.</span>
                </label>
                {errors.inAgreement && <p className="error">{errors.inAgreement}</p>}
                
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default Step77;
        
   