import React, { useState } from 'react';
import img1 from '../../img/is_kotel.jpg';
import img2 from '../../img/po_stene.jpg';
import img3 from '../../img/metall.jpg';
import img4 from '../../img/himself.jpg';

function Step2({ formData, updateFormData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.step2 || '');
  const [customLink, setCustomLink] = useState(formData.customLink || '');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    updateFormData({ step2: value });
  };

  const handleCustomLinkChange = (e) => {
    setCustomLink(e.target.value);
    updateFormData({ customLink: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div>
      <h4>Вывод из котельной</h4>
      <form onSubmit={handleSubmit}>
        <div className="group_img">
          <label className="img_border">
            <input
              type="radio"
              name="step2"
              value="Вывод трубы из котельной"
              checked={selected === 'Вывод трубы из котельной'}
              onChange={handleChange}
            />
            <div className="img_choos">
              <img src={img1} alt="Вывод трубы из котельной" className="img_size" />
              <span style={{ marginLeft: '10px' }}>Вывод трубы из котельной</span>
            </div>
          </label>

          <label className="img_border">
            <input
              type="radio"
              name="step2"
              value="Вывод трубы по стене"
              checked={selected === 'Вывод трубы по стене'}
              onChange={handleChange}
            />
            <div className="img_choos">
              <img src={img2} alt="Вывод трубы по стене" className="img_size" />
              <span style={{ marginLeft: '10px' }}>Вывод трубы по стене</span>
            </div>
          </label>

          <label className="img_border">
            <input
              type="radio"
              name="step2"
              value="Металлоконструкция"
              checked={selected === 'Металлоконструкция'}
              onChange={handleChange}
            />
            <div className="img_choos">
              <img src={img3} alt="Металлоконструкция" className="img_size" />
              <span style={{ marginLeft: '10px' }}>Металлоконструкция</span>
            </div>
          </label>

          <label className="img_border">
            <input
              type="radio"
              name="step2"
              value="Свой вариант"
              checked={selected === 'Свой вариант'}
              onChange={handleChange}
            />
            <div className="img_choos">
              <img src={img4} alt="Свой вариант" className="img_size" />
              {/* <span style={{ marginLeft: '10px' }}>Свой вариант</span> */}
              {selected === 'Свой вариант' && (
                <input
                  type="text"
                  placeholder="Вставьте ссылку на файл"
                  value={customLink}
                  onChange={handleCustomLinkChange}
                  style={{ marginLeft: '10px' }}
                />
              )}
            </div>
          </label>
        </div>

        <div>
          {onBack && (
            <button type="button" onClick={onBack}>
              Назад
            </button>
          )}
          <button type="submit">Далее</button>
        </div>
      </form>
    </div>
  );
}

export default Step2;
