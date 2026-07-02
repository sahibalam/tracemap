import api from './api'

class UploadService {
  /**
   * Upload a profile image directly
   */
  async uploadProfileImage(userId, file) {
    try {
      // Get presigned URL
      const response = await api.post('/upload/profile', {
        userId,
        fileName: file.name,
        fileType: file.type
      })

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to get upload URL')
      }

      const data = response.data.data

      // Upload to S3
      const uploadResponse = await fetch(data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`)
      }

      // Get view URL
      const viewResponse = await api.get(`/upload/view/${encodeURIComponent(data.fileKey)}`)

      return {
        success: true,
        uploadUrl: data.uploadUrl,
        fileKey: data.fileKey,
        fileUrl: data.fileUrl,
        viewUrl: viewResponse.data.success ? viewResponse.data.data.viewUrl : data.viewUrl
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }
}

export default new UploadService()