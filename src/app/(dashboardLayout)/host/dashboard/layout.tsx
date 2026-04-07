import React from 'react'

const HostOverViewLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='p-0'>{children}</div>
  )
}

export default HostOverViewLayout