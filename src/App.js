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
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, " ");
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
    // str = str.trim();
    // bắt đầu xóa dấu tiếng việt  trong chuỗi
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
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
          <Title color="pink">Nhập tên ngân hàng khác tên</Title>
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
      <Input onChange={(e) => handleMoneySend(e)} placeholder="VNĐ" />
      <Title color="red">{errorTransferMSG}</Title>
      <Title color="pink">
        Phi chuyen tien VNĐ{" "}
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
