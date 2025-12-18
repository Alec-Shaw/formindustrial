import React, { useState, useEffect } from 'react';
import image_pic from '../../img/pic.jpg'

const Step8 = ({ formData, updateFormData, onNext, onBack }) => {
    
    const [economizer, setEconomizer] = useState('Нет');  // Дефолт для экономайзера
    const [dymosos, setDymosos] = useState('Нет');

    useEffect(() => {
    // 1. Синхронизируем локальный стейт из formData (если вернулись назад)
    if (formData.Экономайзер) setEconomizer(formData.Экономайзер);
    if (formData.Дымосос) setDymosos(formData.Дымосос);

    // 2. ВАЖНО: Если в formData еще нет этих ключей, записываем туда "Нет"
    if (!formData.Экономайзер || !formData.Дымосос) {
        updateFormData({
            Экономайзер: formData.Экономайзер || 'Нет',
            Дымосос: formData.Дымосос || 'Нет',
        });
    }
}, []);

    const handleEconomizerChange = (e) => {
        const value = e.target.value;
        setEconomizer(value);
        updateFormData({
            Экономайзер: value,
        });
    };

    const handleDymososChange = (e) => {
        const value = e.target.value;
        setDymosos(value);
        updateFormData({
            Дымосос: value,
        });
    };

    const handleDiametrChange = (e) => {
        const value = e.target.value;
        updateFormData({
            Диаметр_dk: value,
        });
    };

    const handleVisotaChange = (e) => {
        const value = e.target.value;
        updateFormData({
            Высота_hk: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Валидация: проверяем все ключевые поля (адаптируйте по необходимости)
        if (!formData.Экономайзер || !formData.Дымосос) {
            alert('Выберите варианты для экономайзера и дымососа!');
            return;
        }
        if (!formData.Диаметр_dk || !formData.Высота_hk) {
            alert('Введите диаметр и высоту патрубка!');
            return;
        }
        // Если нужно передать value для ветвления в onNext (напр. Экономайзер)
        onNext(formData.Экономайзер);  // Или комбо, напр. { экономайзер: formData.Экономайзер, ... }
    };

    return (
        <div className='img_right'>
        <div>
            <h4>Экономайзер, дымосос</h4>
            <form onSubmit={handleSubmit}>
                <div className='quest'>Есть ли после котла экономайзер</div>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="economaizer"
                        value="Да"
                        onChange={handleEconomizerChange} 
                    />
                    Да
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="economaizer"
                        value="Нет"
                        onChange={handleEconomizerChange}
                        checked={economizer === 'Нет'}
                    />
                    Нет
                </label>
                <br />
                <div className='quest'>Есть ли после котла дымосос</div>
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="dymosos"
                        value="Да"
                        onChange={handleDymososChange}
                    />
                    Да
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option4"
                        name="dymosos"
                        value="Нет"
                        onChange={handleDymososChange}
                        checked={dymosos === 'Нет'}
                    />
                    Нет
                </label>
                <br />
                
                
                    <div className='quest'>Диаметр дымоотводящего патрубка (dk)</div>
                <label>
                    <input
                        type="text"
                        id="diametr"
                        name="diametr"
                        onChange={handleDiametrChange}
                        placeholder="Введите значение"
                    />
                </label>
                <br />
                    <div className='quest'>Высота дымоотводящего патрубка (hk)</div>
                <label>
                    <input
                        type="text"
                        id="visota"
                        name="visota"
                        onChange={handleVisotaChange}
                        placeholder="Введите значение"
                    />
                </label>
                
                
                
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
                </div>
                  <img className='img_size_2' src={image_pic} alt=""/>
        </div>
    );
};

export default Step8;