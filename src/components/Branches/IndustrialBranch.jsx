import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step0 from '../Steps/Step0';
import Step1 from '../Steps/Step1';
import Step2 from '../Steps/Step2';
import Step3 from '../Steps/Step3';
import Step4 from '../Steps/Step4';
import Step5 from '../Steps/Step5';
import Step6 from '../Steps/Step6';
import Step7 from '../Steps/Step7';
import Step8 from '../Steps/Step8';
import Step9 from '../Steps/Step9';
import Step10 from '../Steps/Step10';
import Step11 from '../Steps/Step11';
import Step12 from '../Steps/Step12';
import Step13 from '../Steps/Step13';
import Step14 from '../Steps/Step14';
import Step15 from '../Steps/Step15';
import Step16 from '../Steps/Step16';
import Step17 from '../Steps/Step17';
import Step18 from '../Steps/Step18';
import Step19 from '../Steps/Step19';
import Step20 from '../Steps/Step20';
import Step21 from '../Steps/Step21';
import Step22 from '../Steps/Step22';
import Step23 from '../Steps/Step23';
import Step24 from '../Steps/Step24';
import Step25 from '../Steps/Step25';
import Step77 from '../Steps/Step77';

function IndustrialBranch({ formData, updateFormData }) {
    const [currentStep, setCurrentStep] = useState('step1');
    const [history, setHistory] = useState(['step1']);  //History: push to onNext, to onBack
    const navigate = useNavigate();
    // Utility for pushing to history
    const updateHistory = (newStep) => {
        setHistory(prev => {
            if (prev[prev.length - 1] === newStep) return prev;  
            return [...prev, newStep];
        });
    };

    const onNextWithHistory = (nextStep) => {
        return () => {
            setCurrentStep(nextStep);
            updateHistory(nextStep);
        };
    };

    const getNextStep = (defaultNext, conditionKey) => {
    return (currentAnswer = '') => {  
        let nextStep = defaultNext;
        if (conditionKey) {
            const answer = currentAnswer || formData[conditionKey] || '';
            console.log('getNextStep:', conditionKey, 'answer =', answer);  
            
            // conditions for branching
            
             if (conditionKey === 'step5') {
                 if (answer.includes('Разные котлы') && formData.Что_требуется === 'Только АЭ без чертежа') {
                     nextStep = 'step16';  
                 } 
                 if (answer.includes('Разные котлы') && formData.Что_требуется === 'Только чертеж без АЭ') {
                     nextStep = 'step22';  
                 } 
                 if (answer.includes('Разные котлы') && formData.Что_требуется === 'АЭ + Чертеж') {
                     nextStep = 'step24';  
                 } 
             }
            

            // if (conditionKey === 'step6' && answer.includes('Другой котел')) {
            //     nextStep = 'step16';  
            // } 
            if (conditionKey === 'step6') {
                if (answer.includes('Другой котел') && formData.Что_требуется === 'Только АЭ без чертежа') {
                    nextStep = 'step16';  
                } 
                if (answer.includes('Другой котел') && formData.Что_требуется === 'Только чертеж без АЭ') {  // Новое условие от Step4
                    nextStep = 'step22'; 
                }
                
            }

            if (conditionKey === 'step7') {
                // if (formData.Что_требуется === 'Только АЭ без чертежа') {
                //     nextStep = 'step8';  
                // } 
                if (formData.Что_требуется === 'Только чертеж без АЭ' || formData.Что_требуется === 'АЭ + Чертеж') {  
                    nextStep = 'step17'; 
                }

            }

            if (conditionKey === 'step9' && answer.includes('вытянутая развернутая длина')) {
                nextStep = 'step10';  
            }

            if (conditionKey === 'step9' && answer.includes('От котла до МК по прямой Lпрям')) {
                nextStep = 'step11';  
            } 

            if (conditionKey === 'step9' && answer.includes('Примерно не более Lпримерн')) {
                nextStep = 'step12';  
            }
             
            if (conditionKey === 'step17') {

                if (answer.includes('Заполнить размеры') && formData.Что_требуется === 'Только чертеж без АЭ') {
                    nextStep = 'step23';  
                }
                if (answer.includes('Заполнить размеры') && formData.Что_требуется === 'АЭ + Чертеж') {
                     nextStep = 'step25';  
                 } 
            }
            
        }

        setCurrentStep(nextStep);
        updateHistory(nextStep);
    };
};

    const handleBack = () => {
        setHistory(prev => {
            const newHistory = [...prev];
            newHistory.pop();  
            const prevStep = newHistory[newHistory.length - 1] || 'step1';  
            setCurrentStep(prevStep);
            return newHistory;
        });
    };
    // const handleSubmit = () => {
        
    //     const formDataArray = Object.keys(formData)
    //         .filter(key => {
    //             // We exclude technical keys that do not need to be sent to the table
    //             if (key === 'step3_image') return false; 
    //             if (key === 'step9_text') return false; 
    //             if (key === 'step17') return false; 
    //             const value = formData[key];
    //             return value !== undefined 
    //             && value !== null 
    //             && value !== ''
    //             && String(value).trim() !== '';
    //         })
    //         .map(key => ({
    //             step: key,
    //             answer: formData[key]
    //         }));
    //     fetch('https://script.google.com/macros/s/AKfycbwYadIeETU5f-Q1bqqaA5STWdFpC2tgMFJPmvevlQjkDLLIGaNxefwRA5CZeG0z_Mk5/exec', {
    //         method: 'POST',
    //         body: JSON.stringify(formDataArray)
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             alert(result.message || 'Отправлено!');
    //             navigate('/complete'); 
    //         })
    //         .catch(error => alert('Ошибка: ' + error.message));

    // };
    
    const handleSubmit = async () => {
    // Формируем массив данных, фильтруя ненужные ключи
    const formDataArray = Object.keys(formData)
        .filter(key => {
            if (key === 'step3_image' || key === 'step9_text' || key === 'step17') return false; 
            const value = formData[key];
            return value !== undefined 
                && value !== null 
                && value !== '' 
                && String(value).trim() !== '';
        })
        .map(key => ({
            step: key,
            answer: formData[key]
        }));

    try {
        // Отправляем данные только на ваш PHP-скрипт на Beget
        const response = await fetch('https://industrial.ironandsteel.ru/send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataArray),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === 'success') {
                navigate('/complete'); 
            } else {
                alert('Ошибка сервера при отправке почты');
            }
        } else {
            alert('Ошибка сети или сервера');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить форму: ' + error.message);
    }
};
    const steps = {
        step0: <Step0 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step1')} />,
        step1: <Step1 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step2')} onBack={() => navigate('/')} />,
        step2: <Step2 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step3')} onBack={handleBack} />,
        step3: <Step3 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step4')} onBack={handleBack} />,
        step4: <Step4 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step5')} onBack={handleBack} />,
        step5: <Step5 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step6', 'step5')} onBack={handleBack} />,
        step6: <Step6 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step7', 'step6')} onBack={handleBack} />,
        step7: <Step7 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step8', 'step7')} onBack={handleBack} />,
        step8: <Step8 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step9')} onBack={handleBack} />,
        step9: <Step9 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step10', 'step9')} onBack={handleBack} />,
        step10: <Step10 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step13')} onBack={handleBack} />,
        step11: <Step11 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step13')} onBack={handleBack} />,
        step12: <Step12 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step13')} onBack={handleBack} />,
        step13: <Step13 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step14')} onBack={handleBack} />,
        step14: <Step14 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step15')} onBack={handleBack} />,
        step15: <Step15 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step77')} onBack={handleBack} />,
        step16: <Step16 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step9')} onBack={handleBack} />,
        step17: <Step17 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step18', 'step17')} onBack={handleBack} />,
        step18: <Step18 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step19')} onBack={handleBack} />,
        step19: <Step19 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step20')} onBack={handleBack} />,
        step20: <Step20 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step21')} onBack={handleBack} />,
        step21: <Step21 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step77')} onBack={handleBack} />,
        step22: <Step22 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step17')} onBack={handleBack} />,
        step23: <Step23 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step20')} onBack={handleBack} />,
        step24: <Step24 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step17')} onBack={handleBack} />,
        step25: <Step25 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step20')} onBack={handleBack} />,
        step77: <Step77 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={handleBack} />,
        // step8: <Step8 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step9')} onBack={() => setCurrentStep('step77')} />,
        // step9: <Step9 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step10')} onBack={() => setCurrentStep('step8')} />,
        // step10: <Step10 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={() => setCurrentStep('step9')} />
    };

    return (
        <div>

            {steps[currentStep]}
        </div>
    );
}
export default IndustrialBranch;