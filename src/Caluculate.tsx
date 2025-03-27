import { evaluate } from "mathjs";
import { useState } from "react"

const Calu = () => {
    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<string>("0");
    const [selectedClient , setSelectedClient] = useState<string>("");
    const [curr, setCurr] = useState<string>("");
    const handleClick = (value: string) => {
        setInput(input + value)
        setResult(input + value)
    };

    const handleClear = () => {
        setInput("");
        setResult("0");
    };

    // useEffect(() => {
    //     try{
    //     let res= evaluate(input)
    //     setResult(res)
    //     }
    //     catch{
    //         setResult(input)
    //     }
    // }, [input]);
    const currency: { [key: string]: { [key: string]: number } } = {
        "SHJ":{
            "RUP":23.77,
            "TBU":0.76
        },
        "RUP":{
            "SHJ":0.042,
            "TBU":0.032
        },
        "TBU":{
            "RUP":31.44,
            "SHJ":1.32
        }
    }
    const conversion = (num: number, val1: keyof typeof currency, val2: keyof typeof currency[typeof val1]) => {
        let multa = currency[val2][val1];
        return num*multa;
    }
    const handleClerk = (value: string) => {
        setCurr(value)
        console.log(value)
    }
    const handleClient = (value: string) => {
        setSelectedClient(value);
        console.log(value)
    }
    const Evaluate = (input: string) => {
        try {
            let res = evaluate(input)
            if(selectedClient!= curr && selectedClient != "" && curr != ""){
                res = conversion(res,selectedClient,curr);
            }
            setResult(res)
        }
        catch {
            setResult(input)
        }
    };

    return (
        <>
            <div className="page-bg calculator">
                <div className="island">
                    <div className="buttons">
                        <div className="display">
                            <input type="text" className="dn" value={input} readOnly />
                            <div className="result md:text-2xl text-2xl mb-17 text-red-600 font-extrabold max-h-40 overflow-auto">
                                {result}
                            </div>

                        </div>

                        <button >From</button>
                        {["SHJ", "RUP", "TBU"].map((client) => (
                            <button
                                key={client}
                                style={{backgroundColor:"green"}}
                                className={`px-4 py-2 rounded-md transition-all bg-green-800 ${curr === client ? "text-red-700 opacity-50" : "opacity-100"
                                    }`}
                                onClick={() => handleClerk(client)}
                            >
                                {client}
                            </button>
                        ))}

                        <button onClick={handleClear}>C</button>
                        <button onClick={() => handleClick("(")}>(</button>
                        <button onClick={() => handleClick(")")}>)</button>
                        <button onClick={() => handleClick("/")}>/</button>
                        <button onClick={() => handleClick("7")}>7</button>
                        <button onClick={() => handleClick("8")}>8</button>
                        <button onClick={() => handleClick("9")}>9</button>
                        <button onClick={() => handleClick("*")}>*</button>
                        <button onClick={() => handleClick("4")}>4</button>
                        <button onClick={() => handleClick("5")}>5</button>
                        <button onClick={() => handleClick("6")}>6</button>
                        <button onClick={() => handleClick("-")}>-</button>
                        <button onClick={() => handleClick("1")}>1</button>
                        <button onClick={() => handleClick("2")}>2</button>
                        <button onClick={() => handleClick("3")}>3</button>
                        <button onClick={() => handleClick("+")}>+</button>
                        <button onClick={() => handleClick("0")} className="zero">
                            0
                        </button>
                        <button onClick={() => handleClick(".")}>.</button>
                        <button onClick={() => Evaluate(input)}>=</button>

                        <button>To</button>
                        {["SHJ", "RUP", "TBU"].map((client) => (
                            <button
                                key={client}
                                style={{backgroundColor:"green"}}
                                className={`px-4 py-2 rounded-md transition-all ${selectedClient === client ? "opacity-50" : "opacity-100"
                                    }`}
                                onClick={() => handleClient(client)}
                            >
                                {client}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calu;