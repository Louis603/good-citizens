class CreateMarkers < ActiveRecord::Migration[7.0]
  def change
    create_table :markers do |t|
      t.string :name
      t.string :description
      t.string :image
      t.string :coordinates, array: true, default: []
      t.integer :user_id

      t.timestamps
    end
  end
end
