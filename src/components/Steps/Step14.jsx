import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  // Путь к хуку (адаптируйте)

const Step14 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    // Локальное состояние для основных выборов (сброс при re-render)
    const [mainChoice, setMainChoice] = useState('');  // Основной выбор
    const [subChoice, setSubChoice] = useState('');  // Нок/Нз для conditional
    const [customValue, setCustomValue] = useState('');  // Значение для Нок/Нз

    // Для третьего варианта — радио для выбора одного подпункта (mutually exclusive)
    const [selectedSubpoint, setSelectedSubpoint] = useState('');  // '1', '2', or '3'
    const [notMore, setNotMore] = useState('');  // Подпункт 1
    const [notLess, setNotLess] = useState('');

    const [nokNotMore, setNokNotMore] = useState('');  // Подпункт 2
    const [nokNotLess, setNokNotLess] = useState('');

    // Подпункт 3 — только радио, без inputs

    const handleMainChange = (e) => {
        const value = e.target.value;
        setMainChoice(value);
        setSubChoice('');  // Сброс sub при смене main
        setCustomValue('');
        // Сброс third
        setSelectedSubpoint('');
        setNotMore(''); setNotLess('');
        setNokNotMore(''); setNokNotLess('');
        updateFormData({ step18: value });
        clearError('mainChoice');
        clearError('subChoice');
        clearError('customValue');
        clearError('selectedSubpoint');
        clearError('notMore'); clearError('notLess');
        clearError('nokNotMore'); clearError('nokNotLess');
    };

    const handleSubChange = (e) => {
        const value = e.target.value;
        setSubChoice(value);
        updateFormData({ sub18: value });
        clearError('subChoice');
    };

    const handleCustomValueChange = (e) => {
        const value = e.target.value;
        setCustomValue(value);
        updateFormData({ custom18: value });
        clearError('customValue');
    };

    // Handlers for third option subpoints
    const handleSelectedSubpointChange = (e) => {
        const value = e.target.value;
        setSelectedSubpoint(value);
        // Сброс inputs при смене
        if (value !== '1') {
            setNotMore(''); setNotLess('');
        }
        if (value !== '2') {
            setNokNotMore(''); setNokNotLess('');
        }
        updateFormData({ selectedSubpoint18: value });
        clearError('selectedSubpoint');
    };

    const handleNotMoreChange = (e) => {
        const value = e.target.value;
        setNotMore(value);
        updateFormData({ notMore18: value });
        clearError('notMore');
    };

    const handleNotLessChange = (e) => {
        const value = e.target.value;
        setNotLess(value);
        updateFormData({ notLess18: value });
        clearError('notLess');
    };

    const handleNokNotMoreChange = (e) => {
        const value = e.target.value;
        setNokNotMore(value);
        updateFormData({ nokNotMore18: value });
        clearError('nokNotMore');
    };

    const handleNokNotLessChange = (e) => {
        const value = e.target.value;
        setNokNotLess(value);
        updateFormData({ nokNotLess18: value });
        clearError('nokNotLess');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Объект полей для валидации
        const fields = {
            mainChoice: mainChoice,
            mainChoice_rules: { required: true },  // Основной выбор обязателен
        };

        // Условная валидация
        if (mainChoice === 'Известна, строго определенная' || mainChoice === 'Есть высота нужно перепроверить') {
            fields.subChoice = subChoice;
            fields.subChoice_rules = { required: true };
            fields.customValue = customValue;
            fields.customValue_rules = { required: true };
        }

        if (mainChoice === 'Нужно определить требуемую высоту АЭ') {
            // Один подпункт обязателен: selectedSubpoint + его inputs
            fields.selectedSubpoint = selectedSubpoint;
            fields.selectedSubpoint_rules = { required: true };

            if (selectedSubpoint === '1') {
                fields.notMore = notMore;
                fields.notMore_rules = { required: true, number: true };
                fields.notLess = notLess;
                fields.notLess_rules = { required: true, number: true };
            } else if (selectedSubpoint === '2') {
                fields.nokNotMore = nokNotMore;
                fields.nokNotMore_rules = { required: true, number: true };
                fields.nokNotLess = nokNotLess;
                fields.nokNotLess_rules = { required: true, number: true };
            }
            // Для 3 — только radio, без inputs
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            // Нет alert — ошибки под полями
            return;
        }
        onNext();  // Переход
    };

    return (
        <div>
            <h4>Высота АЭ</h4>
            <form onSubmit={handleSubmit}>
                <div className="img_choos">
                    <div style={{display: 'flex'}}>
                        <input
                            type="radio"
                            id="step17"
                            name="step17"
                            value="Известна, строго определенная"
                            checked={mainChoice === "Известна, строго определенная"}
                            onChange={handleMainChange}
                        />
                        Известна, строго определенная
                    </div>
                    {mainChoice === 'Известна, строго определенная' && (
                        <div style={{marginLeft: "30px"}}>
                            <br />
                            <div style={{display: 'flex'}}>
                                <input
                                    type="radio"
                                    id="stp17"
                                    name="subStep"
                                    value="Нок"
                                    checked={subChoice === "Нок"}
                                    onChange={handleSubChange}
                                />
                                Нок (от котла)
                            </div>
                            <br />
                            <div style={{display: 'flex'}}>
                                <input
                                    type="radio"
                                    id="stp07"
                                    name="subStep"
                                    value="Нз"
                                    checked={subChoice === "Нз"}
                                    onChange={handleSubChange}
                                />
                                Нз (от земли)
                            </div>
                            <br />
                            {(subChoice === 'Нок' || subChoice === 'Нз') && (
                                <input
                                    type="text"
                                    placeholder={`Заполните ${subChoice}`}
                                    value={customValue}
                                    onChange={handleCustomValueChange}
                                    style={{ marginLeft: '10px', display: 'block' }}
                                />
                            )}
                            {errors.subChoice && <p className="error">{errors.subChoice}</p>}
                            {errors.customValue && <p className="error">{errors.customValue}</p>}
                        </div>
                    )}
                </div>
                <br />
                <label>
                    <div className="img_choos">
                        <div style={{display: 'flex'}}>
                            <input
                                type="radio"
                                id="step1"
                                name="step17"
                                value="Есть высота нужно перепроверить"
                                checked={mainChoice === "Есть высота нужно перепроверить"}
                                onChange={handleMainChange}
                            />
                            Есть высота нужно перепроверить
                        </div>
                        {mainChoice === 'Есть высота нужно перепроверить' && (
                            <div style={{marginLeft: "30px"}}>
                                <br />
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="radio"
                                        id="stp17"
                                        name="subStep"
                                        value="Нок"
                                        checked={subChoice === "Нок"}
                                        onChange={handleSubChange}
                                    />
                                    Нок (от котла)
                                </div>
                                <br />
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="radio"
                                        id="stp07"
                                        name="subStep"
                                        value="Нз"
                                        checked={subChoice === "Нз"}
                                        onChange={handleSubChange}
                                    />
                                    Нз (от земли)
                                </div>
                                <br />
                                {(subChoice === 'Нок' || subChoice === 'Нз') && (
                                    <input
                                        type="text"
                                        placeholder={`Заполните ${subChoice}`}
                                        value={customValue}
                                        onChange={handleCustomValueChange}
                                        style={{ marginLeft: '10px', display: 'block' }}
                                    />
                                )}
                                {errors.subChoice && <p className="error">{errors.subChoice}</p>}
                                {errors.customValue && <p className="error">{errors.customValue}</p>}
                            </div>
                        )}
                    </div>
                </label>
                
                <label>
                <div className="img_choos">
                  <div style={{display: 'flex'}}>
                    <input
                        type="radio"
                        name="step17"
                        value="Нужно определить требуемую высоту АЭ"
                        checked={mainChoice === 'Нужно определить требуемую высоту АЭ'}
                        onChange={handleMainChange}
                    />
                    Нужно определить требуемую высоту АЭ</div>
                    {mainChoice === 'Нужно определить требуемую высоту АЭ' && (
                        <div style={{ marginLeft: '30px' }}>
                            <br />
                            <div style={{display: 'flex'}}> <input
                                type="radio"
                                name="subpoint"
                                value="1"
                                checked={selectedSubpoint === "1"}
                                onChange={handleSelectedSubpointChange}
                            /> не более <input
                                type="text"
                                placeholder="не более"
                                value={notMore}
                                onChange={handleNotMoreChange}
                                style={{ margin: '0 5px' }}
                            /> не менее <input
                                type="text"
                                placeholder="не менее"
                                value={notLess}
                                onChange={handleNotLessChange}
                                style={{ margin: '0 5px' }}
                            /></div>
                            {errors.notMore && <p className="error">{errors.notMore}</p>}
                            {errors.notLess && <p className="error">{errors.notLess}</p>}
                            <br />
                            <div style={{display: 'flex'}}>
                             <input
                                type="radio"
                                name="subpoint"
                                value="2"
                                checked={selectedSubpoint === "2"}
                                onChange={handleSelectedSubpointChange}
                            /> Нок не более <input
                                type="text"
                                placeholder="не более"
                                value={nokNotMore}
                                onChange={handleNokNotMoreChange}
                                style={{ margin: '0 5px' }}
                            /> не менее <input
                                type="text"
                                placeholder="не менее"
                                value={nokNotLess}
                                onChange={handleNokNotLessChange}
                                style={{ margin: '0 5px' }}
                            /></div>
                            {errors.nokNotMore && <p className="error">{errors.nokNotMore}</p>}
                            {errors.nokNotLess && <p className="error">{errors.nokNotLess}</p>}
                            <br />
                            <div style={{display: 'flex'}}>
                             <input
                                type="radio"
                                name="subpoint"
                                value="3"
                                checked={selectedSubpoint === "3"}
                                onChange={handleSelectedSubpointChange}
                            /> Выбрать min при диаметре выхода котла</div>
                        </div>
                    )}
                    </div>
                </label>
                {errors.mainChoice && <p className="error">{errors.mainChoice}</p>}
                {errors.selectedSubpoint && <p className="error">{errors.selectedSubpoint}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step14;