import React from 'react'
import { useRouter } from 'next/router'

const Details = () => {
    const router = useRouter();
    const {postId} = router.query;
  return (
    <div>{postId}</div>
  )
}

export default Details