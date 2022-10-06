pub use apibara_core::application::pb;
use apibara_core::stream::{MessageData, Sequence, StreamId};
use async_trait::async_trait;

/// Application is responsible for handling input messages and generating an output sequence.
#[async_trait]
pub trait Application {
    /// The type of message generated by the application.
    type Message: MessageData;

    /// Error type returned by fallible functions.
    type Error: std::error::Error + Send + Sync + 'static;

    /// Called on the first start. Returns the application configuration.
    async fn init(&mut self) -> Result<pb::InitResponse, Self::Error>;

    /// Called when the application receives data from an input stream.
    async fn receive_data(
        &mut self,
        input_id: &StreamId,
        sequence: &Sequence,
        data: &[u8],
    ) -> Result<Vec<Self::Message>, Self::Error>;
}