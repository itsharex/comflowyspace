import React, { useCallback, useState } from 'react';
import { Button, Modal, Space } from "antd";
import { useQueueState } from '@comflowy/common/store/comfyui-queue-state';
import styles from "./reactflow-queue.module.scss";
import { DraggableModal } from 'ui/antd/draggable-modal';

const Queue = () => {
  const queue = useQueueState(st => st.queue);
  const queueRunning = queue.queue_running || [];
  const queuePending = queue.queue_pending || [];
  const onDeleteFromQueue = useQueueState(st => st.onDeleteFromQueue);
  const onInterruptQueue = useQueueState(st => st.onInterruptQueue);
  const loading = useQueueState(st => st.loading);
  return (
    <div style={{minHeight: 200}}>
      <div className="section queue">
        <div className="section-title">Running</div>
        <div className="section-content">
          {queueRunning.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="item-title">Running-{index + 1}:</div>
                <Button size='small' type="default" onClick={onInterruptQueue}>Cancel</Button>
              </div>
            )
          })}
        </div>
      </div>
      <div className="section queue">
        <div className="section-title">Pending</div>
        <div className="section-content">
          {queuePending.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="item-title">Pending-{index + 1}:</div>
                <Button size='small' type="default" onClick={ev => {
                  onDeleteFromQueue(item.id)
                }}>Cancel</Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export const QueueEntry = React.memo(() => {
  const [visible, setVisible] = useState(false);
  const onClearQueue = useQueueState(st => st.onClearQueue);
  const onQueueUpdate = useQueueState(st => st.onQueueUpdate);
  const loading = useQueueState(st => st.loading);
  const queue = useQueueState(st => st.queue);
  const queueRunning = queue.queue_running || [];
  const queuePending = queue.queue_pending || [];
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = useCallback(e => {
    console.log(e);
    setVisible(false);
  }, [setVisible]);

  console.log("visible", visible);
  return (
    <div className="action action-queue">
      <div onClick={showModal}>Queue</div>
      <DraggableModal
        title="Queue"
        open={visible}
        className={styles.queueWrapper}
        onOk={handleOk}
        initialWidth={300}
        initialHeight={300}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="actions" style={{
          marginBottom: 20
        }}>
          <Space>
            <Button disabled={ loading || queueRunning.length + queuePending.length === 0} onClick={onClearQueue}>Clear Queue</Button>
            <Button disabled={loading} onClick={onQueueUpdate}>Refresh Queue</Button>
          </Space>
        </div>
        <Queue/>
      </DraggableModal>
    </div>
  )
});