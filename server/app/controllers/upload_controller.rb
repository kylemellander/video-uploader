class UploadController < ApplicationController

  def create
    upload = upload_params["0"]
    size = upload_params["size"]
    if !check_is_file(upload)
      render json: json_error("No Attached File", "There was no file attached to upload."), status: 422
    elsif check_size(size, upload)
      render json: json_error("File Too Large", "Maximum file size is 100MB."), status: 422
    elsif !check_mp4(upload.tempfile)
      render json: json_error("Bad File", "That does not seem to be a valid mp4 file. Pick another video."), status: 422
    else
      url = write_file(upload)

      render json: {
        data: {
          attributes: {
            url: url
          }
        }
      }
    end
  end

  private

  def video_dir
    if Rails.env.test?
      'public/test/'
    else
      'public/videos/'
    end
  end

  def increment_filename(filename)
    count = 1
    ext = File.extname(filename)
    unique_name = "#{count}#{ext}"

    while File.exist?("#{video_dir}#{count}#{ext}") do
      count += 1
      unique_name = "#{count}#{ext}"
    end

    unique_name
  end

  def check_is_file(upload)
    upload && upload.class.to_s.split("::").last == "UploadedFile"
  end

  def check_size(size, upload)
    size.to_i > 104857600 || upload.size() > 104857600
  end

  def check_mp4(file)
    begin
      MP4Info.new(file)
      true
    rescue
      file.rewind
      false
    end
  end

  def write_file(upload)
    filename = upload.original_filename
    filename = increment_filename(filename)
    port = request.port == 80 ? "" : ":#{request.port}"
    File.open("#{Rails.root}/#{video_dir}#{filename}", 'wb') { |file|
      upload.rewind
      file.write(upload.read)
    }

    "#{request.protocol}#{request.host}#{port}/videos/#{filename}"
  end

  def upload_params
    params.permit("0", "size")
  end

  def json_error(title, detail)
    {
      "errors": [
        {
          "status": "422",
          "title":  title,
          "detail": detail
        }
      ]
    }
  end

end
