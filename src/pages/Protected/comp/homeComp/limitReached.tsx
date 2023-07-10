import '../../styles/home.css'
const LimitReached = () => {
  return (
    <>
      <div className="main">
        <p className='toptext'>You've reached your limit of free messages 🫣</p>
        <p className='center'>Get unlimited messages for only 9€ per month!</p>
        <img className='arrow_curved' src='img/curved_arrow.png' />
      </div>
    </>
  );
}

export default LimitReached;