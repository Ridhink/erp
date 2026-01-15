'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/helpers'

interface AddLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: unknown) => void
}

export function AddLeadModal({ isOpen, onClose, onSubmit }: AddLeadModalProps) {
  const [activeTab, setActiveTab] = React.useState('bulk')
  const [file, setFile] = React.useState<File | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile)
    }
  }

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]
    const validExtensions = ['.csv', '.xls', '.xlsx']

    const hasValidType = validTypes.includes(file.type)
    const hasValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    )

    return (hasValidType || hasValidExtension) && file.size <= 5 * 1024 * 1024 // 5MB
  }

  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const csvContent = 'Name,Email,Phone,Source\nJohn Doe,john@example.com,1234567890,Website\n'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'leads-template.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = () => {
    if (activeTab === 'bulk' && !file) {
      alert('Please select a file to upload')
      return
    }

    onSubmit?.({ tab: activeTab, file })
    handleClose()
  }

  const handleClose = () => {
    setFile(null)
    setActiveTab('bulk')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Leads"
      className="max-w-3xl"
      showCloseButton={true}
    >
      <div>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Add leads individually or upload in bulk
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="individual">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="individual"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">Individual Lead</span>
                <span className="text-xs font-normal">Add one lead at a time</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="bulk"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              }
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">Bulk Upload</span>
                <span className="text-xs font-normal">Upload CSV/Excel file</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <IndividualLeadForm onSubmit={handleSubmit} />
          </TabsContent>

          <TabsContent value="bulk">
            <div className="space-y-6">
              {/* File Format Instructions */}
              <Card variant="outlined">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <CardTitle className="text-base">File Format Instructions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Supported formats: CSV, Excel (.xlsx, .xls)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Required columns: Name, Email, Phone, Source</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Maximum file size: 5MB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Maximum rows: 1000 leads per upload</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Download Template */}
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Download Template
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Use our template to ensure proper formatting
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDownloadTemplate}
                  className="gap-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CSV
                </Button>
              </div>

              {/* Upload File */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <div
                  className={cn(
                    'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
                    isDragging
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : file
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50',
                    'hover:border-gray-400 hover:bg-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <svg
                    className={cn(
                      'mb-4 h-12 w-12',
                      file ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {file ? (
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Click to upload or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        CSV, XLSX or XLS (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={activeTab === 'bulk' && !file}
            className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {activeTab === 'bulk' ? 'Upload Leads' : 'Add Lead'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function IndividualLeadForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    source: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <Input
        label="Name *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter lead name"
        required
      />
      <Input
        label="Email *"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email address"
        required
      />
      <Input
        label="Phone *"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        required
      />
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Source *
        </label>
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white"
          required
        >
          <option value="">Select source</option>
          <option value="website">Website</option>
          <option value="google-ads">Google Ads</option>
          <option value="social">Social Media</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="manual">Manual</option>
        </select>
      </div>
    </div>
  )
}
