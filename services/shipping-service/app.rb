require 'sinatra'
require 'mysql2'
require 'json'

set :bind, '0.0.0.0'
set :port, 8006

DB_HOST = ENV['DB_HOST'] || 'mysql-shipping'
DB_NAME = ENV['DB_NAME'] || 'shippingdb'
DB_USER = ENV['DB_USER'] || 'shippinguser'
DB_PASS = ENV['DB_PASS'] || 'shippingpass'

def db_client
  Mysql2::Client.new(
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  )
end

get '/shipping' do
  client = db_client
  results = client.query("SELECT order_id, status FROM shipments")
  shipments = results.map { |row| { order_id: row['order_id'], status: row['status'] } }
  content_type :json
  shipments.to_json
end

post '/shipping' do
  data = JSON.parse(request.body.read)
  order_id = data['order_id']
  status = data['status'] || 'PENDING'

  if !order_id
    halt 400, { error: 'order_id required' }.to_json
  end

  client = db_client
  client.query("INSERT INTO shipments (order_id, status) VALUES ('#{client.escape(order_id)}', '#{client.escape(status)}')
                ON DUPLICATE KEY UPDATE status='#{client.escape(status)}'")

  content_type :json
  { message: 'Shipping record updated' }.to_json
end
