import { useState } from "react";

function Seletor({ onSelect, unidade }) {
    const handleSelectChange = (e) => {
        onSelect(e.target.value);
    };

    return (
        <div>   
            <label htmlFor="medidas">Selecione uma unidade de medida:</label>
            <select id="medidas" name="medidas" value={unidade} onChange={handleSelectChange}>
                <option value="km">Quilômetros (km)</option>
                <option value="hm">Hectômetros (hm)</option>
                <option value="dam">Decâmetros (dam)</option>
                <option value="m">Metros (m)</option>
                <option value="dm">Decímetros (dm)</option>
                <option value="cm">Centímetros (cm)</option>
                <option value="mm">Milímetros (mm)</option>
            </select>
        </div>
    );
}

function CaixaValor({ value, onInputChange }) {
    const handleInputChange = (e) => {
        onInputChange(e.target.value);
    };

    return (
        <input
            type="number"
            id="valor"
            name="valor"
            value={value}
            onChange={handleInputChange}
        />
    );
}

function converterUnidade(valor, unidadeOrigem, unidadeDestino) {
        const fatores = {
            km: 1000,     
            hm: 100,      
            dam: 10,      
            m: 1,         
            dm: 0.1,      
            cm: 0.01,     
            mm: 0.001     
        };
    
        let valorEmMetros = valor * fatores[unidadeOrigem];
    
        return valorEmMetros / fatores[unidadeDestino];
}




function Conversor() {
    const [unidade1, setUnidade1] = useState("m");
    const [unidade2, setUnidade2] = useState("m");
    const [valor1, setValor1] = useState("");
    const [valorConvertido, setValorConvertido] = useState(null);
    const [unidadeConvertida, setUnidadeConvertida] = useState(null);

    const handleConversao = () => {
        const resultado = converterUnidade(parseFloat(valor1), unidade1, unidade2);
        setUnidadeConvertida(unidade2);
        setValorConvertido(resultado);
    };

    return (
        <div>
            <h3>Seleção de Unidades</h3>

            <Seletor unidade={unidade1} onSelect={setUnidade1} />
            <CaixaValor 
                onInputChange={setValor1} 
                value={valor1}
            />

            <Seletor unidade={unidade2} onSelect={setUnidade2} />

            <br />
            <button onClick={handleConversao}>Calcular!</button>

            {valorConvertido !== null && (
                <p>Valor convertido: {valorConvertido} {unidadeConvertida}</p>
            )}
        </div>
    );
}

export default Conversor;
