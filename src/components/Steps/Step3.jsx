import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation'; 
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

const Step3 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedText, setSelectedText] = useState('');
    
    const handleChange = (e) => {
        const selectedValue = e.target.value; //key for exampl 'option1'
        const selectedText = e.target.dataset.text;
        setSelectedValue(selectedValue);
        setSelectedText(selectedText)
        
        updateFormData({
            Количество_котлов_и_расположение_котлов_и_тип_несущей_башни: selectedText,
            step3_image: selectedValue  
        });
        clearError('выбор');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation fields object
        const fields = {
            выбор: selectedText || '',
            выбор_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }
        onNext();  
    };

    // Маппинг ключей на импорты (для получения src)
    // const imageMap = {
    //     option1: img1,
    //     option2: img12,
    //     option3: img13,
    //     option4: img14,
    //     option5: img2,
    //     option6: img21,
    //     option7: img22,
    //     option8: img23,
    //     option9: img24,
    //     option10: img3,
    //     option11: img31,
    //     option12: img32,
    //     option13: img33,
    //     option14: img4,
    //     option15: img41,
    //     option16: img42,
    //     option17: img43,
    // };

    

    return (
        <div>
            <h4>Количество котлов и расположение котлов и тип несущей башни</h4>
            <form onSubmit={handleSubmit}>
                <div className="group_img">
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option1"  
                            data-text="1 котел. Плоская попере"
                            checked={selectedValue === "option1"}  
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img1}  
                                alt="Вариант 1"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>1 котел. Плоская поперек</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option2"
                            data-text="1 котел. Плоская вдоль"
                            checked={selectedValue === "option2"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img12}
                                alt="Вариант 2"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>1 котел. Плоская вдоль</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option3"
                            data-text="1 котел. Треугольная"
                            checked={selectedValue === "option3"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img13}
                                alt="Вариант 3"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>1 котел. Треугольная</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option4"
                            data-text="1 котел. Квадратная"
                            checked={selectedValue === "option4"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img14}
                                alt="Вариант 4"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>1 котел. Квадратная</span>
                        </div>
                    </label>
                </div>
                <div className="group_img">
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option5"  
                            data-text="2 котла. Плоская поперек"
                            checked={selectedValue === "option5"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img2}  
                                alt="Вариант 5"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>2 котла. Плоская поперек</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option6"
                            data-text="2 котла. Плоская вдоль"
                            checked={selectedValue === "option6"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img21}
                                alt="Вариант 6"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>2 котла. Плоская вдоль</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option7"
                            data-text="2 котла. Треугольная"
                            checked={selectedValue === "option7"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img22}
                                alt="Вариант 7"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>2 котла. Треугольная</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option8"
                            data-text="2 котла. Треугольная"
                            checked={selectedValue === "option8"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img23}
                                alt="Вариант 8"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>2 котла. Треугольная</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option9"
                            data-text="2 котла. Квадратная"
                            checked={selectedValue === "option9"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img24}
                                alt="Вариант 9"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>2 котла. Квадратная</span>
                        </div>
                    </label>
                </div>
                <div className="group_img">
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option10"  
                            data-text="3 котла. Плоская поперек"
                            checked={selectedValue === "option10"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img3}  
                                alt="Вариант 10"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>3 котла. Плоская поперек</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option11"
                            data-text="3 котла. Плоская вдоль"
                            checked={selectedValue === "option11"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img31}
                                alt="Вариант 11"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>3 котла. Плоская вдоль</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option12"
                            data-text="3 котла. Треугольная"
                            checked={selectedValue === "option12"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img32}
                                alt="Вариант 12"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>3 котла. Треугольная</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option13"
                            data-text="3 котла. Квадратная"
                            checked={selectedValue === "option13"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img33}
                                alt="Вариант 13"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>3 котла. Квадратная</span>
                        </div>
                    </label>
                </div>
                <div className="group_img">
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option14"  
                            data-text="4 котла. Плоская поперек"
                            checked={selectedValue === "option14"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img4}  
                                alt="Вариант 14"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>4 котла. Плоская поперек</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option15"
                            data-text="4 котла. Плоская вдоль"
                            checked={selectedValue === "option15"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img41}
                                alt="Вариант 15"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>4 котла. Плоская вдоль</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option16"
                            data-text="4 котла. Треугольная"
                            checked={selectedValue === "option16"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img42}
                                alt="Вариант 16"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>4 котла. Треугольная</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step3"
                            value="option17"
                            data-text="4 котла. Квадратная"
                            checked={selectedValue === "option17"}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img
                                src={img43}
                                alt="Вариант 17"
                                className="img_size"
                            />
                            <span style={{ marginLeft: '10px' }}>4 котла. Квадратная</span>
                        </div>
                    </label>
                </div>
                
                {errors.выбор && <p className="error">{errors.выбор}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
}

export default Step3;