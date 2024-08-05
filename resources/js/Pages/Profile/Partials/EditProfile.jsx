import React,{ useState } from 'react'
import { Transition } from '@headlessui/react';
import { editProfile } from '@/services/profile/profile.services';
import LoadingButton from '@mui/lab/LoadingButton';

export default function EditProfile({auth}) {
  const [imgProfile, setImgProfile ] = useState((auth.user.profile_img)?`/${auth.user.profile_img}`:"/image/emptyProfile.jpg");
  const [paramImage, setParamImage] = useState();
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
    submitProfile();
  }
  // console.log(auth)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgProfile(URL.createObjectURL(event.target.files[0]));
      setParamImage(event.target.files[0])
    }
  }

  const submitProfile = () => {
    if(!paramImage) { return false;}
    const formData = new FormData();
    formData.append("image",paramImage);
    editProfile(formData).then((res) => {
      console.log(res)
      if(res.data.status == "success") {
        setLoading(false)
      }
    })
  }

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Profile</h2>
      <div className="flex gap-4 items-center mb-4">
        <img src={imgProfile} alt="" className="w-20 h-20 rounded-full" />
        <input type="file" onChange={onImageChange} />
      </div>
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        variant="outlined"
      >
        <span>SAVE</span>
      </LoadingButton>
    </section>
  )
}
