#  Service Workers (SW) - Notes

### Motivation:
- Offline first
- Cache API
- Push notifications
- Background sync

### Considerations:
- sw are event driven
- sw are terminated when not in use
- sw are not bound to a single page
- sw are HTTPS only
- sw can't access DOM
- sw can't use synchronous APIs like XHR, localStorage, SessionStorage, cookies etc.
- sw **can** use APIs like IndexedDB and the Cache API

### Browser Support:
![Browsers Support](browsers-support.png)


### LifeCycle
1. Register
2. Download
3. Install
4. Activate

<!-- 
Update
Idle
Unregister
Terminated -->

### Events
- Install
- Activate
- Message

### Functional Events
- Fetch
- Sync
- Push

