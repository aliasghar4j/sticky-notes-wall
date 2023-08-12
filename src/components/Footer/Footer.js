import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear();
    return (
    <footer className='bg-info'>
<div className="container">
    <div className="row">
        <div className="col">
        <p className='text-center mb-0'>&copy; {year}. All Rights Reserved.</p>
        </div>
    </div>
</div>



    </footer>
  )
}
