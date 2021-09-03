import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PaginationComponent() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
}
