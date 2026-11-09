'use client';

import { useState } from 'react';
import AdminWelcomeScreen from '@/components/admin/AdminWelcomeScreen';

export default function AdminWelcomeTrigger() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (!showWelcome) return null;

  return <AdminWelcomeScreen onComplete={() => setShowWelcome(false)} />;
}
