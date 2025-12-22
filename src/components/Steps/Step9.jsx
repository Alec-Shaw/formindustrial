import React, { useState, useEffect } from 'react';
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
import img_pic from '../../img/pic.jpg';

function Step9({ formData, updateFormData, onBack, onNext }) {
    const { errors, setErrors, validateField, clearError } = useFormValidation(); 

    
    const [expandedLength, setExpandedLength] = useState( '');
    const [straightLength, setStraightLength] = useState('');
    const [approxLength, setApproxLength] = useState('');


    const handleExpandedChange = (e) => {
        const value = e.target.value;
        setExpandedLength(value);
        updateFormData({ Вытянутая_развернутая_длина: value });
        clearError('expandedLength');
    };

    const handleElongatedChange = (e) => {
        const value = e.target.value;
        setStraightLength(value);
        updateFormData({ От_котла_до_МК_по_прямой_Lпрям: value });
        clearError('straightLength');
    };

    const handleApproximatelyChange = (e) => {
        const value = e.target.value;
        setApproxLength(value);
        updateFormData({ Примерно_не_более_Lпримерн: value });
        clearError('approxLength');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const expandedError = validateField('expandedLength', expandedLength, { number: true });
        const straightError = validateField('straightLength', straightLength, { number: true });
        const approxError = validateField('approxLength', approxLength, { number: true });

        
        if (expandedError) setErrors(prev => ({ ...prev, expandedLength: expandedError }));
        if (straightError) setErrors(prev => ({ ...prev, straightLength: straightError }));
        if (approxError) setErrors(prev => ({ ...prev, approxLength: approxError }));

        
        if (!expandedLength.trim() && !straightLength.trim() && !approxLength.trim()) {
            setErrors(prev => ({ ...prev, general: 'Заполните хотя бы один вариант длины!' }));
            return;
        }
      
        setErrors(prev => ({ ...prev, general: '' }));

        clearError('expandedLength');
        clearError('straightLength');
        clearError('approxLength');

        onNext();  
    };

    // Mapping keys to imports for image display
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

    // Get the src by key from formData.step3_image
    const selectedImageSrc = formData.step3_image ? imageMap[formData.step3_image] : null;

    return (
        <div>
            <h4>Длина, L (заполните один вариант)</h4>
            
            {/* Displaying the selected image from step 3 */}
            {selectedImageSrc ? (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <p>Выбранный вариант из шага 3:</p>
                    <div>
                    <img
                        src={selectedImageSrc}
                        alt="Выбранный вариант"
                        style={{ maxWidth: '400px',  border: '1px solid #ccc', borderRadius: '8px', marginRight: '30px' }}
                    />
                    <img alt='' 
                    src={img_pic} 
                    style={{ maxWidth: '400px',  border: '1px solid #ccc', borderRadius: '8px' }} />
                   </div>
                </div>
            ) : (
                <p style={{ color: 'orange' }}>Изображение не выбрано (вернитесь к шагу 3).</p>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className='quest'>Всего ('вытянутая развернутая длина') Lврд</div>
                <label>
                    <input
                        type="text"
                        id="expanded"
                        name="expanded"
                        value={expandedLength}  
                        onChange={handleExpandedChange}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.expandedLength && <p className="error">{errors.expandedLength}</p>}
                <br />
                <div className='quest'>От котла до МК по прямой Lпрям (требуются размеры RBAM)</div>
                <label>
                    <input
                        type="text"
                        id="elongate"
                        name="elongate"
                        value={straightLength}
                        onChange={handleElongatedChange}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.straightLength && <p className="error">{errors.straightLength}</p>}
                <br />
                <div className='quest'>Примерно не более Lпримерн</div>
                <label>
                    <input
                        type="text"
                        id="approximately"
                        name="approximately"
                        value={approxLength}
                        onChange={handleApproximatelyChange}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.approxLength && <p className="error">{errors.approxLength}</p>}
                <br />
                
                {errors.general && <p className="error">{errors.general}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
}

export default Step9;