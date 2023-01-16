import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'
import { makeNotification } from './factories/notification-factory'

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const getRecipientNotifications = new GetRecipientNotifications(notificationRepository)
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-2'}))
    const { notifications } = await getRecipientNotifications.execute({ recipientId: 'recipient-1' })
    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' })
    ]))
  })
})
