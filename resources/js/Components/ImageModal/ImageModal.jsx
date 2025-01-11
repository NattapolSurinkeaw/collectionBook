import React from 'react'
import Swal from 'sweetalert2';


export default function ImageModal(image) {
  return (
    Swal.fire({
      imageUrl: image, // URL ของรูปภาพ
      imageAlt: 'Custom image',
      confirmButtonText: 'ปิด',
      customClass: {
        popup: 'custom-popup-image', // Custom สำหรับ container
        image: 'custom-image-modal', // Custom สำหรับรูปภาพ
      },
      background: 'transparent',
    })
  )
}
