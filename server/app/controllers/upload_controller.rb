class UploadController < ApplicationController

  def create
    filename = upload_params.original_filename

    filename = increment_filename(filename)
    File.open(video_dir + filename, 'w:ASCII-8BIT') { |file|
      file.write(upload_params.read)
    }
    render json: {}
  end

  def increment_filename(filename)
    count = 0
    unique_name = filename
    while File.exist?(video_dir + unique_name) do
      count += 1
      ext = File.extname(filename)
      basename = File.basename(filename, ext)
      unique_name = "#{basename}_#{count}#{ext}"
    end

    unique_name
  end

  private

  def video_dir
    'public/videos/'
  end

  def upload_params
    params.require("0")
  end

end
