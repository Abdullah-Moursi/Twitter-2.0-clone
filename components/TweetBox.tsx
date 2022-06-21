import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageIsValid, setImageIsValid] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!imageInputRef.current?.value) setImageIsValid(false)
    else if (imageInputRef.current.value && imageIsValid) {
      setImage(imageInputRef.current.value)
      imageInputRef.current.value = ''
      setImageUrlBoxIsOpen(false)
    }
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg:
        session?.user?.image ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRok_BUdv1oJkVi09IkXw3IpMA1F2SN2FUCvA&usqp=CAU',
      image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Sent!', {
      icon: '👍',
    })
    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (session) {
      postTweet()
      setInput('')
      setImage('')
      setImageUrlBoxIsOpen(false)
    } else setIsLoggedIn(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={
          session?.user?.image ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRok_BUdv1oJkVi09IkXw3IpMA1F2SN2FUCvA&usqp=CAU'
        }
        alt={session?.user?.name || 'user-avatar'}
        className="mt-4 h-14 w-14 rounded-full object-cover"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
          />
          {image && (
            <div className="relative">
              <button
                className="absolute 
            mt-2 ml-2 h-10 w-10 rounded-full bg-slate-800 pb-1 text-3xl text-white opacity-70 transition-all duration-200 
              hover:opacity-50"
                onClick={() => setImage('')}
              >
                <span>&times;</span>
              </button>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  setImage('')
                  setImageIsValid(false)
                  setImageUrlBoxIsOpen(true)
                }}
                src={image}
                alt={input}
                className="mb-5 h-60 w-full rounded-xl object-contain shadow-lg "
              />
            </div>
          )}
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => {
                  setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)
                  setImageIsValid(true)
                }}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                (!input && !image) || (input.trim().length === 0 && !image)
              }
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {!isLoggedIn && (
            <p className="mt-2 pl-2 text-rose-600">You have to log-in first!</p>
          )}

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                onChange={() => setImageIsValid(true)}
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {!imageIsValid && imageUrlBoxIsOpen && (
            <p className="pl-3 text-rose-600">
              Please enter a valid image URL.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
