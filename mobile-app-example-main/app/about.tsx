import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import React from 'react';

export default function AboutPage() {
  return (
    <div>
      About us page
      <Link href="/">
        <Link.Trigger>
          <ThemedText type="subtitle">Go to home</ThemedText>
        </Link.Trigger>
      </Link>
    </div>
  );
}
