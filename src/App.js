import { account, typeAccount, banks } from "./accountData";
import { useState } from "react";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => {
    console.log(props.color);
    return props.color;
  }};
`;
const Input = styled.input`
  type: "text",
  color: palevioletred;
  font-size: 1rem;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Select = styled.select`
type: "text",
color: palevioletred;
font-size: 1em;
border: 2px solid palevioletred;
border-radius: 3px;`;
const Option = styled.option`
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Textarea = styled.textarea`
type: "text",
color: palevioletred;
font-size: 1rem;
border: 2px solid palevioletred;
border-radius: 3px;
`;
function App() {
  const [accountSelected, setAccountSelected] = useState(account[0].totalMoney);
  const [typeAccountSelected, setTypeAccountSelected] = useState("");
  const [numberMoneySend, setNumberMoneySend] = useState("");
  const [transferFee, setTransferFee] = useState(0);
  const [errorTransferMSG, setErrorTransferMSG] = useState("");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  //  console.log(accountSelected)
  const handleSelectedAccount = (e) => {
    setAccountSelected((pre) => (pre = e.target.value));
  };
  const handleSelectTypeAccount = (e) => {
    setTypeAccountSelected(e.target.value);
  };

  const handleMoneySend = (e) => {
    let result = e.target.value;

    setNumberMoneySend(result);

    if (result >= 50000 && result <= accountSelected) {
      console.log(numberMoneySend);
      setErrorTransferMSG("");
      setTransferFee(Math.floor(numberMoneySend) / 5);
    } else if (result < 50000) {
      setErrorTransferMSG("Please enter a transfer amount greater than 50000");
    }
    if (result > accountSelected) {
      setErrorTransferMSG(
        " so tien muon chuyen phai nho hon so tien co trong tai khoan"
      );
    }
  };
  const handleNoteMoney = (e) => {
    let note = e.target.value;
    let noteLength = note.trim().length;
    console.log(noteLength);
    let noteNew = loc_xoa_dau(note);
    setNote(noteNew);
    console.log(noteNew);
    if (noteLength >= 140) {
      setNoteError("khong duoc nhap qua 140 ki tu");
    }
  };

  function loc_xoa_dau(str) {
    // G???p nhi???u d???u space th??nh 1 space
    str = str.replace(/\s+/g, " ");
    // lo???i b??? to??n b??? d???u space (n???u c??) ??? 2 ?????u c???a chu???i
    // str = str.trim();
    // b???t ?????u x??a d???u ti???ng vi???t  trong chu???i
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    return str;
  }

  return (
    <div className="App">
      <Title color="pink">So tai khoan</Title>
      <Select onChange={(e) => handleSelectedAccount(e)}>
        {account.map((item) => {
          return (
            <Option value={item.totalMoney}>
              {item.accountNumber}-{item.name}
            </Option>
          );
        })}
      </Select>

      <Title color="pink">
        So tien co the chuyen{" "}
        {accountSelected.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </Title>

      <Title color="pink">Loai tai khoan</Title>
      <Select onChange={(e) => handleSelectTypeAccount(e)}>
        {typeAccount.map((item) => {
          return (
            <Option value={item.value}>
              {item.accountNumber}-{item.name}
            </Option>
          );
        })}
      </Select>

      {typeAccountSelected == 2 ? (
        <>
          <Title color="pink">Nh???p t??n ng??n h??ng kh??c t??n</Title>
          <Input />
        </>
      ) : (
        ""
      )}
{/* //full requst */}
      <Title color="pink">So tai khoan thu huong</Title>
      <Input />
      <Title color="pink">Ngan hang thu huong</Title>

      <Select>
        {banks.map((item, index) => {
          return <Option key={index}>{item.name}</Option>;
        })}
      </Select>
      <Title color="pink">Chi nhanh</Title>
      <Select>
        {banks.map((item) => {
          return <Option>{item.branch}</Option>;
        })}
      </Select>
      <Title color="pink">So tien chuyen</Title>
      <Input onChange={(e) => handleMoneySend(e)} placeholder="VN??" />
      <Title color="red">{errorTransferMSG}</Title>
      <Title color="pink">
        Phi chuyen tien VN??{" "}
        {transferFee.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}{" "}
      </Title>
      <Title color="pink">Dien giai</Title>
      <Textarea
        onChange={(e) => handleNoteMoney(e)}
        value={note}
        placeholder="Nhap tieng viet khong dau va khong qua 140 ki tu"
        maxLength={140}
        rows="4"
        cols="50"
      ></Textarea>
      <Title color="red">{noteError}</Title>
    </div>
  );
}

export default App;
