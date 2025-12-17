import React from 'react';
// Импорты изображений (путь относительно Step7.js: src/components/Steps/ -> src/img/)
import img1 from '../../img/1.jpg';  
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';
import img12 from '../../img/12.jpg';  
import img13 from '../../img/13.jpg';
import img14 from '../../img/14.jpg';
import img21 from '../../img/21.jpg';  
import img22 from '../../img/22.jpg';
import img23 from '../../img/23.jpg';
import img24 from '../../img/24.jpg';
import img31 from '../../img/31.jpg';  
import img32 from '../../img/32.jpg';
import img33 from '../../img/33.jpg';
import img41 from '../../img/41.jpg';  
import img42 from '../../img/42.jpg';
import img43 from '../../img/43.jpg';

function Step7({ formData, updateFormData, onBack, onSubmit }) {
    const handleChange = (e) => {
        updateFormData({ page1_panel: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.page1_panel) {
            alert('Выберите вариант!');
            return;
        }

        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit();  // Отправка формы
        } else {
            console.error('onSubmit не является функцией');  // Дебаг, если что
        }
    };

    // Маппинг ключей на импорты для отображения изображения
    const imageMap = {
        option1: img1,
        option2: img12,
        option3: img13,
        option4: img14,
        option5: img2,
        option6: img21,
        option7: img22,
        option8: img23,
        option9: img24,
        option10: img3,
        option11: img31,
        option12: img32,
        option13: img33,
        option14: img4,
        option15: img41,
        option16: img42,
        option17: img43,
    };

    // Получаем src по ключу из formData.step3_image (который является ключом, напр. 'option1')
    const selectedImageSrc = formData.step3_image ? imageMap[formData.step3_image] : null;

    return (
        <div>
            <h4>Шаг 7: Page1 Panel — Панель управления</h4>
            
            {/* Отображение выбранного изображения из шага 3 */}
            {selectedImageSrc ? (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <p>Выбранный вариант из шага 3:</p>
                    <img 
                        src={selectedImageSrc} 
                        alt="Выбранный вариант" 
                        style={{ maxWidth: '300px', maxHeight: '200px', border: '1px solid #ccc', borderRadius: '8px' }} 
                    />
                    <p>{formData.step3_selection || 'Не указано'}</p>
                </div>
            ) : (
                <p style={{ color: 'orange' }}>Изображение не выбрано (вернитесь к шагу 3).</p>
            )}
            
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="radio" name="page1_panel" value="Автоматическая" onChange={handleChange} />
                    Автоматическая панель
                </label>
                <br />
                <label>
                    <input type="radio" name="page1_panel" value="Ручная" onChange={handleChange} />
                    Ручная панель
                </label>
                <br />
                <label>
                    <input type="radio" name="page1_panel" value="С датчиками" onChange={handleChange} />
                    С дополнительными датчиками
                </label>
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
}

export default Step7;