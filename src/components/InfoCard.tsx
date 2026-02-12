const InfoCard = ({statsName, stats, currentTheme}: any) => {
  return (
    <div
      className={`
        ${currentTheme === 'light' ? 'bg-white border border-black/15' : 'bg-white/5 border border-white/10'} 
        backdrop-blur-sm
        px-3
        py-2
        rounded-sm
        flex
        flex-col
        w-20
      `}
    >
      <p className={`${currentTheme === 'light' ? 'text-black' : 'text-white'} font-normal text-sm`}>
        {statsName}
      </p>
      <span className='text-xl'>
        {stats}
      </span>
    </div>
  )
}

export default InfoCard