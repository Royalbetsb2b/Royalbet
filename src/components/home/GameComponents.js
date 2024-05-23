/* eslint-disable react/prop-types */
/**
 * eslint-disable react/prop-types
 *
 * @format
 */

export const TxiconIn = () => {
  return (
    <div className="rounded-[100%] flex justify-center items-center bg-[#a23eff33] p-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.64 7.15C8.93 6.86 9.41 6.86 9.7 7.15L14.08 11.53V9.1C14.08 8.69 14.42 8.35 14.83 8.35C15.24 8.35 15.58 8.69 15.58 9.1V13.34C15.58 13.44 15.56 13.53 15.52 13.63C15.44 13.81 15.3 13.96 15.11 14.04C15.02 14.08 14.92 14.1 14.82 14.1H10.58C10.17 14.1 9.83 13.76 9.83 13.35C9.83 12.94 10.17 12.6 10.58 12.6H13.01L8.64 8.21C8.35 7.92 8.35 7.45 8.64 7.15ZM18.24 17.22C16.23 17.89 14.12 18.23 12 18.23C9.88 18.23 7.77 17.89 5.76 17.22C5.37 17.09 5.16 16.66 5.29 16.27C5.42 15.88 5.84 15.66 6.24 15.8C9.96 17.04 14.05 17.04 17.77 15.8C18.16 15.67 18.59 15.88 18.72 16.27C18.84 16.67 18.63 17.09 18.24 17.22Z"
          fill="#A23EFF"
        />
      </svg>
    </div>
  );
};

export const TxiconOut = () => {
  return (
    <div className="rounded-[100%] flex justify-center items-center bg-[#a23eff33] p-2">
      <svg
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.89152 22.5338L17.2712 22.4656C20.9111 22.436 23.0634 20.2484 23.0338 16.6085L22.9657 8.2388C22.936 4.58892 20.7485 2.43665 17.1086 2.46625L8.73885 2.53433C5.09897 2.56394 2.94669 4.75152 2.9763 8.3914L3.04446 16.7711C3.06407 20.4111 5.25164 22.5634 8.89152 22.5338ZM16.3994 17.3225C16.1118 17.6149 15.6318 17.6188 15.3394 17.3311L10.9239 12.9869L10.9437 15.4168C10.947 15.8268 10.6098 16.1696 10.1998 16.1729C9.78984 16.1762 9.44709 15.839 9.44375 15.429L9.40927 11.1892C9.40845 11.0892 9.42772 10.999 9.46691 10.8987C9.54544 10.718 9.68422 10.5669 9.87356 10.4854C9.96323 10.4446 10.0631 10.4238 10.1631 10.423L14.4029 10.3885C14.8129 10.3852 15.1557 10.7224 15.159 11.1324C15.1623 11.5424 14.8251 11.8851 14.4151 11.8885L11.9852 11.9082L16.3908 16.2625C16.6831 16.5502 16.6869 17.0202 16.3994 17.3225ZM6.7178 7.33093C8.72228 6.6446 10.8294 6.28745 12.9494 6.27021C15.0693 6.25297 17.182 6.57579 19.1974 7.22942C19.5884 7.35625 19.8019 7.78452 19.6751 8.17557C19.5483 8.56661 19.1301 8.79002 18.729 8.65328C14.999 7.44358 10.9091 7.47684 7.19933 8.74706C6.8104 8.88023 6.37871 8.67373 6.24554 8.2848C6.12229 7.88579 6.32887 7.4641 6.7178 7.33093Z"
          fill="#A23EFF"
        />
      </svg>
    </div>
  );
};

export const Txtype = ({ txtype }) => {
  return (
    <div className="font-semibold text-xs ml-2 text-[#0D0033]">{txtype}</div>
  );
};

export const Txdate = ({ date }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      // minute: '2-digit',
      // second: '2-digit',
      // timeZoneName: 'short',
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };
  return <div className="font-meduim  ml-2 text-xs">{formatDate(date)}</div>;
};

export const Txstatus = ({ status }) => {
  return (
    <div className="bg-[#a23eff33] flex justify-center items-center rounded-[18px] px-2 py-1 text-center">
      <span className="text-[#A23EFF] text-xs font-medium">{status}</span>
    </div>
  );
};

export const Txbalance = ({ amount }) => {
  return <div className="text-[#0D0033] text-xs ml-2 font-bold">₦{amount}</div>;
};
