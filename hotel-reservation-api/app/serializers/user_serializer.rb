class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  # MongoDB ID to string
  def id
    object.id.to_s
  end
end
