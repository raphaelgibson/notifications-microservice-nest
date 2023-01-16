import { SendNotification } from '@application/usecases/send-notification'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const sendNotification = new SendNotification(notificationRepository)
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id'
    })
    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})
