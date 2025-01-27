'use client'

import { useEffect } from 'react'
import { checkApiHealth } from '@/lib/api'

export default function TestApiConnection() {
  useEffect(() => {
    async function test() {
      try {
        const isHealthy = await checkApiHealth();
        console.log('API Health:', isHealthy);
      } catch (error) {
        console.error('API Health Check Failed:', error);
      }
    }
    test();
  }, []);

  return null;
}
